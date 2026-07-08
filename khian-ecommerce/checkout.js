const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// UI elements
const orderItems = document.getElementById("order-items");
const totalPrice = document.getElementById("total-price");

let cartData = [];

// =========================
// LOAD CART FROM MYSQL
// =========================
document.addEventListener("DOMContentLoaded", loadCheckoutCart);

function loadCheckoutCart() {

    fetch(`http://localhost:3000/api/cart/${user.id}`)
    .then(res => res.json())
    .then(data => {

        cartData = data.items || [];

        renderOrderSummary(cartData);
        totalPrice.innerText = "₱" + data.total;

    });
}

// =========================
// RENDER ORDER SUMMARY
// =========================
function renderOrderSummary(items) {

    orderItems.innerHTML = "";

    if (!items.length) {
        orderItems.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    items.forEach(item => {

        let subtotal = item.price * item.quantity;

        orderItems.innerHTML += `
        <div class="order-item">
            <h4>${item.product_name}</h4>
            <p>Qty: ${item.quantity}</p>
            <p>₱${subtotal}</p>
        </div>
        `;
    });
}

// =========================
// CHECKOUT SUBMIT
// =========================
document.getElementById("checkout-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const payment = document.querySelector('input[name="payment"]:checked');

    if (!payment) {
        alert("Please select payment method");
        return;
    }

    if (cartData.length === 0) {
        alert("Cart is empty");
        return;
    }

    fetch("http://localhost:3000/api/orders/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user.id,
            payment_method: payment.value,
            items: cartData
        })
    })
    .then(res => res.json())
    .then(data => {

        alert("Order placed successfully! ID: " + data.order_id);

        window.location.href = "order-success.html";
    })
    .catch(err => {
        console.error(err);
        alert("Checkout failed");
    });

});