const user = JSON.parse(localStorage.getItem("currentUser"));

const ordersContainer = document.getElementById("orders-list");

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", loadOrders);

// =========================
// LOAD ORDERS FROM MYSQL
// =========================
function loadOrders() {

    fetch(`http://localhost:3000/api/orders/${user.id}`)
    .then(res => res.json())
    .then(data => {

        renderOrders(data);

    })
    .catch(err => {
        console.error(err);
        ordersContainer.innerHTML = "<p>Error loading orders</p>";
    });
}

// =========================
// RENDER ORDERS
// =========================
function renderOrders(orders) {

    ordersContainer.innerHTML = "";

    if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = "<p>No orders found</p>";
        return;
    }

    orders.forEach(order => {

        ordersContainer.innerHTML += `
        <div class="order-card">
            <h3>Order ID: ${order.order_id}</h3>
            <p>Total: ₱${order.total}</p>
            <p>Payment: ${order.payment_method}</p>
            <p>Status: ${order.status}</p>
            <p>Date: ${order.created_at}</p>
        </div>
        `;
    });
}