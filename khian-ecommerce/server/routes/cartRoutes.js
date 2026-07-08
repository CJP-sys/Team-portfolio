const express = require("express");
const router = express.Router();
const db = require("../config/db");


// ➕ ADD TO CART (auto merge quantity if exists)
router.post("/add", async (req, res) => {
    try {
        const { product_name, price, quantity, user_id } = req.body;

        // check if item already exists
        const checkSql = `
            SELECT * FROM cart
            WHERE product_name = ? AND user_id = ?
        `;

        const [existing] = await db.query(checkSql, [product_name, user_id]);

        if (existing.length > 0) {
            const updateSql = `
                UPDATE cart
                SET quantity = quantity + ?
                WHERE product_name = ? AND user_id = ?
            `;

            await db.query(updateSql, [quantity, product_name, user_id]);

            return res.json({ success: true, message: "Cart updated (quantity increased)" });
        }

        const insertSql = `
            INSERT INTO cart (product_name, price, quantity, user_id)
            VALUES (?, ?, ?, ?)
        `;

        await db.query(insertSql, [product_name, price, quantity, user_id]);

        res.json({ success: true, message: "Product added successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// GET CART
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query(
        "SELECT * FROM cart WHERE user_id = ?",
        [userId],
        (err, results) => {
            if (err) return res.status(500).json(err);

            let total = results.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);

            res.json({
                items: results,
                total
            });
        }
    );
});

// UPDATE QTY
router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;

    db.query(
        "UPDATE cart SET quantity = ? WHERE id = ?",
        [quantity, id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

// REMOVE ITEM
router.delete("/remove/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM cart WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

module.exports = router;