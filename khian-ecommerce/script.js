const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");


if(bar){

bar.addEventListener("click",()=>{

nav.classList.add("active");

document.body.style.overflow="hidden";

});

}


if(close){

close.addEventListener("click",()=>{

nav.classList.remove("active");

document.body.style.overflow="auto";

});

}



// mobile close

document.querySelectorAll("#navbar a")
.forEach(link=>{

link.addEventListener("click",()=>{

nav.classList.remove("active");

document.body.style.overflow="auto";

});

});




const sections = document.querySelectorAll(
"section:not(#header)"
);


// show animation on page load

window.addEventListener("load",()=>{

sections.forEach((section,index)=>{

setTimeout(()=>{

section.classList.add("show");

}, index * 150);


});

});




// keep scroll animation

window.addEventListener("scroll",()=>{


sections.forEach(section=>{


const top =
section.getBoundingClientRect().top;


if(top < window.innerHeight - 120){

section.classList.add("show");

}


});


});

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("show");
    });
});

function getCartKey() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? `cart_${user.email}` : "cart_guest";
}

function updateCartCount() {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    let cartKey = user ? `cart_${user.email}` : "cart_guest";

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    let totalItems = cart.reduce((sum, item) => sum + Number(item.quantity), 0);

    let badge = document.getElementById("cart-count");

    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? "flex" : "none";
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);

document.addEventListener("DOMContentLoaded", () => {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        console.log("Logged in as:", user.username);
    }
});

const userBtn = document.getElementById("user-btn");
const userDropdown = document.getElementById("user-dropdown");

if (userBtn) {
    userBtn.addEventListener("click", function (e) {
        e.preventDefault();
        userDropdown.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".user-menu")) {
            userDropdown.classList.remove("active");
        }
    });
}

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

const navUsername =
    document.getElementById("nav-username");

if (currentUser && navUsername) {
    navUsername.textContent = currentUser.username;
}

function updateCartCount() {
    const badge = document.getElementById("cart-count");

    if (!badge) return;

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const key = currentUser
        ? `cart_${currentUser.email}`
        : "cart_guest";

    const cart =
        JSON.parse(localStorage.getItem(key)) || [];

    const totalItems = cart.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0),
        0
    );

    badge.textContent = totalItems;
    badge.style.display =
        totalItems > 0 ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});

function updateWishlistCount() {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    let wishlistKey = user
        ? `wishlist_${user.email}`
        : "wishlist_guest";

    let wishlist =
        JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const badge = document.getElementById("wishlist-count");

    if (!badge) return;

    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
    updateWishlistCount();
});

const darkBtn = document.getElementById("dark-mode-btn");

// Apply saved mode on every page
if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
}

// Only run button code if the button exists
if (darkBtn) {

    darkBtn.innerHTML =
        document.body.classList.contains("dark-mode")
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "on");
            darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem("darkMode", "off");
            darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}