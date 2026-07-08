const db = require("../config/db");

// GET ALL PRODUCTS
exports.getProducts = (req, res) => {

    db.query(
        "SELECT * FROM products ORDER BY id DESC",
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};

// ADD PRODUCT
exports.addProduct = (req, res) => {

    const {
        name,
        brand,
        category,
        description,
        price,
        stock,
        image
    } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            message: "Name and price are required."
        });
    }

    db.query(
        `INSERT INTO products
        (name,brand,category,description,price,stock,image)
        VALUES (?,?,?,?,?,?,?)`,
        [
            name,
            brand,
            category,
            description,
            price,
            stock,
            image
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Product added successfully!"
            });

        }
    );

};