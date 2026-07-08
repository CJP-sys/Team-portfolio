let user = JSON.parse(localStorage.getItem("currentUser"));

let wishlistKey = user
    ? `wishlist_${user.email}`
    : "wishlist_guest";

let wishlist =
    JSON.parse(localStorage.getItem(wishlistKey)) || [];

const container = document.getElementById("wishlist-items");

renderWishlist();

function renderWishlist() {

    document.getElementById("wishlist-total").innerText =
        `${wishlist.length} Item${wishlist.length !== 1 ? "s" : ""} in Wishlist`;

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist">
                <i class="far fa-heart"></i>
                <h2>Your wishlist is empty</h2>
                <p>Save your favorite products here.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";

    wishlist.forEach((item, index) => {
        container.innerHTML += `
            <div class="wish-card">
                <img src="${item.image}">
                <h3>${item.name}</h3>
                <p>${item.price}</p>

                <div class="wish-buttons">
                    <button
                        class="move-cart"
                        onclick="moveToCart(${index})">
                        🛒 Move To Cart
                    </button>

                    <button
                        class="remove-wish"
                        onclick="removeWishlist(${index})">
                        ❌ Remove
                    </button>
                </div>
            </div>
        `;
    });
}

function moveToCart(index) {

    let cartKey = user
        ? `cart_${user.email}`
        : "cart_guest";

    let cart =
        JSON.parse(localStorage.getItem(cartKey)) || [];

    const product = wishlist[index];

    const existing = cart.find(
        item => item.name === product.name
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        cartKey,
        JSON.stringify(cart)
    );

    wishlist.splice(index, 1);

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

    renderWishlist();

    alert("Product moved to cart!");
}

function removeWishlist(index) {
    wishlist.splice(index, 1);

    localStorage.setItem(
        wishlistKey,
        JSON.stringify(wishlist)
    );

    renderWishlist();
}
