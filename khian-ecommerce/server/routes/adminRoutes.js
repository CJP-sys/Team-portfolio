const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/dashboard", async (req, res) => {

    try {

        const [orders] = await db.query("SELECT COUNT(*) as totalOrders FROM orders");

        const [users] = await db.query("SELECT COUNT(*) as totalUsers FROM users");

        const [sales] = await db.query(
            "SELECT SUM(total) as totalSales FROM orders"
        );

        const [recentOrders] = await db.query(
            "SELECT * FROM orders ORDER BY created_at DESC LIMIT 5"
        );

        res.json({
            totalOrders: orders[0].totalOrders,
            totalUsers: users[0].totalUsers,
            totalSales: sales[0].totalSales || 0,
            recentOrders
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }
});

// 📦 GET ALL ORDERS (ADMIN DASHBOARD)
router.get("/orders", async (req, res) => {
    try {

        const [orders] = await db.query(
            "SELECT * FROM orders ORDER BY created_at DESC"
        );

        res.json(orders);

    } catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
});


// 📦 GET ORDER ITEMS
router.get("/orders/:order_id", async (req, res) => {
    try {

        const { order_id } = req.params;

        const [items] = await db.query(
            "SELECT * FROM order_items WHERE order_id = ?",
            [order_id]
        );

        res.json(items);

    } catch (err) {
        console.error(err);
        res.status(500).json([]);
    }
});


// ✏️ UPDATE ORDER STATUS
router.put("/order-status/:order_id", async (req, res) => {

    try {

        const { order_id } = req.params;
        const { status } = req.body;

        await db.query(
            "UPDATE orders SET status = ? WHERE order_id = ?",
            [status, order_id]
        );

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

module.exports = router;