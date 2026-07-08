const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check empty fields
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists."
                    });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(fullname,email,password) VALUES(?,?,?)",
                    [fullname, email, hashedPassword],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.json({
                            success: true,
                            message: "Registration successful!"
                        });

                    }
                );

            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const jwt = require("jsonwebtoken");

// LOGIN
exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password."
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                console.error("Login DB Error:", err);
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            const user = result[0];

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email or password."
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                success: true,
                message: "Login successful!",
                token,
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role
                }
            });

        }
    );

};