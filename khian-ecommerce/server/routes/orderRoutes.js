const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ============================
// CHECKOUT ROUTE
// ============================
router.post("/checkout", async (req, res) => {

    try {
        const { user_id, payment_method, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order_id = "YKB-" + Date.now();

        let total = 0;

        items.forEach(item => {
            total += item.price * item.quantity;
        });

        // save order
        await db.query(
            "INSERT INTO orders (order_id, user_id, total, payment_method) VALUES (?, ?, ?, ?)",
            [order_id, user_id, total, payment_method]
        );

        // save items
        for (let item of items) {
            await db.query(
                "INSERT INTO order_items (order_id, product_name, price, quantity, subtotal) VALUES (?, ?, ?, ?, ?)",
                [
                    order_id,
                    item.product_name,
                    item.price,
                    item.quantity,
                    item.price * item.quantity
                ]
            );
        }

        // clear cart
        await db.query(
            "DELETE FROM cart WHERE user_id = ?",
            [user_id]
        );

        res.json({
            success: true,
            order_id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;

router.get("/:user_id", async (req, res) => {

    try {
        const { user_id } = req.params;

        const [orders] = await db.query(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        );

        res.json(orders);

    } catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
}); 

router.get("/last/:user_id", async (req, res) => {

    try {
        const { user_id } = req.params;

        const [order] = await db.query(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
            [user_id]
        );

        if (order.length === 0) {
            return res.json(null);
        }

        const [items] = await db.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [order[0].order_id]
        );

        res.json({
            order: order[0],
            items
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(null);
    }
});

router.get("/receipt/:order_id", async (req, res) => {

    try {
        const { order_id } = req.params;

        const [order] = await db.query(
            "SELECT * FROM orders WHERE order_id = ?",
            [order_id]
        );

        if (order.length === 0) {
            return res.json(null);
        }

        const [items] = await db.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [order_id]
        );

        res.json({
            order: order[0],
            items
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(null);
    }
});