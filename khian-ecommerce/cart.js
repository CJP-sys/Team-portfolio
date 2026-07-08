const cartItems = document.getElementById("cart-items");
const subtotalBox = document.querySelector("#subtotal table");
const badge = document.getElementById("cart-count");
const emptyCartUI = document.getElementById("empty-cart-image");

const user = JSON.parse(localStorage.getItem("currentUser"));

document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
    if (!user) return;

    fetch(`http://localhost:3000/api/cart/${user.id}`)
        .then(res => res.json())
        .then(data => {

            renderCart(data.items);
            updateTotals(data.total);
            updateBadge(data.items);
            toggleEmptyCart(data.items);

        });
}

function renderCart(items) {

    if (!items || items.length === 0) {
        cartItems.innerHTML = "";
        return;
    }

    cartItems.innerHTML = "";

    items.forEach(item => {

        const total = item.price * item.quantity;

        cartItems.innerHTML += `
        <tr>
            <td>
                <button class="remove-btn" onclick="removeItem(${item.id})">🗑</button>
            </td>

            <td>
                <img src="${item.image || 'images/default.png'}" width="60">
            </td>

            <td>${item.product_name}</td>

            <td>${item.size || '-'}</td>

            <td>₱${item.price}</td>

            <td>
                <div class="qty-box">
                    <button onclick="updateQty(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQty(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </td>

            <td>₱${total}</td>
        </tr>
        `;
    });
}

function updateQty(id, qty) {

    if (qty <= 0) return removeItem(id);

    fetch(`http://localhost:3000/api/cart/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty })
    }).then(() => loadCart());
}

function removeItem(id) {

    fetch(`http://localhost:3000/api/cart/remove/${id}`, {
        method: "DELETE"
    }).then(() => loadCart());
}

function updateTotals(total) {

    if (!subtotalBox) return;

    subtotalBox.innerHTML = `
        <tr>
            <td>Cart Subtotal</td>
            <td>₱${total}</td>
        </tr>
        <tr>
            <td>Shipping</td>
            <td>Free</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>₱${total}</strong></td>
        </tr>
    `;
}

function updateBadge(items) {

    if (!badge) return;

    const count = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
}

function toggleEmptyCart(items) {

    if (!emptyCartUI) return;

    if (!items || items.length === 0) {
        emptyCartUI.style.display = "block";
        cartItems.innerHTML = "";
    } else {
        emptyCartUI.style.display = "none";
    }
}