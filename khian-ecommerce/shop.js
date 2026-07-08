
const CART_KEY = "ykb_cart";
const drawer = document.getElementById("cart-drawer");
const overlay = document.getElementById("drawer-overlay");
const drawerItems = document.getElementById("drawer-items");
const drawerTotal = document.getElementById("drawer-total");
const closeDrawerBtn = document.getElementById("close-drawer");
const viewCartBtn = document.getElementById("view-cart-btn");

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function openDrawer() {
    drawer.classList.add("active");
    overlay.classList.add("active");
}

function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
}

function renderDrawer() {

    const cart = getCart();

    drawerItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        drawerItems.innerHTML = `
            <p style="text-align:center;color:#888;">
                Your cart is empty.
            </p>
        `;

        drawerTotal.textContent = "₱0";

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        drawerItems.innerHTML += `
<div class="drawer-item">

    <img src="${item.image}" alt="${item.name}">

    <div class="drawer-info">

        <h4>${item.name}</h4>

        <p>₱${item.price.toLocaleString()}</p>

        <div class="drawer-controls">

            <button class="minus" data-id="${item.id}">−</button>

            <span>${item.quantity}</span>

            <button class="plus" data-id="${item.id}">+</button>

            <button class="remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>

        </div>

    </div>

</div>
`;

    });

    drawerTotal.textContent =
    "₱" + total.toLocaleString();



}

drawerItems.addEventListener("click", (e) => {

    const id = e.target.dataset.id || e.target.parentElement.dataset.id;

    if (!id) return;

    let cart = getCart();

    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (e.target.classList.contains("plus")) {

        item.quantity++;

    }

    if (e.target.classList.contains("minus")) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(product => product.id !== id);

        }

    }

    if (
        e.target.classList.contains("remove") ||
        e.target.parentElement.classList.contains("remove")
    ) {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart(cart);

    updateCartCount();

    renderDrawer();

});

function updateCartCount() {
    const cart = getCart();

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const badge = document.getElementById("cart-count");

    if (badge) {
        badge.textContent = totalItems;

        badge.classList.remove("bounce");
        void badge.offsetWidth;
        badge.classList.add("bounce");
    }
}

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);

}

// ADD TO CART
document.querySelectorAll(".pro").forEach((card, index) => {
    const btn = card.querySelector(".cart");

    if (!btn) return;

    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const cart = getCart();

        const product = {
    id: card.dataset.link || ("p" + index),
    name: card.querySelector("h5").textContent.trim(),
    price: Number(
    card.querySelector("h4")
        .textContent
        .replace(/[^\d]/g, "")
),
    image: card.querySelector("img").src,
    quantity: 1
};

        const existing = cart.find(
            item => item.id === product.id
        );

        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        saveCart(cart);

updateCartCount();
renderDrawer();
openDrawer();

// Animate button
btn.classList.add("clicked");

// Animate card
card.classList.add("added");

setTimeout(() => {
    btn.classList.remove("clicked");
    card.classList.remove("added");
}, 300);

showToast("Added to cart!");
    });

    card.addEventListener("click", () => {
        const link = card.dataset.link;
        if (link) {
            window.location.href = link;
        }
    });
});

closeDrawerBtn.addEventListener("click", closeDrawer);

overlay.addEventListener("click", closeDrawer);

viewCartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
});

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    document.querySelectorAll(".pro").forEach(card => {

        const name = card
            .querySelector("h5")
            .textContent
            .toLowerCase();

        const brand = card
            .querySelector("span")
            .textContent
            .toLowerCase();

        if (
            name.includes(keyword) ||
            brand.includes(keyword)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});
