let user = JSON.parse(localStorage.getItem("currentUser"));

if (user) {
    document.getElementById("profile-name").textContent = user.username;
    document.getElementById("profile-email").textContent = user.email;
}

/* LOAD IMAGE */
const img = document.getElementById("profile-image");
const savedImage = localStorage.getItem("profileImage");

if (savedImage) img.src = savedImage;

/* UPLOAD IMAGE */
document.getElementById("upload-image").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
        localStorage.setItem("profileImage", reader.result);
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
});

/* EDIT MODAL */
const modal = document.getElementById("modal");

document.getElementById("editBtn").onclick = () => {
    document.getElementById("edit-name").value = user.username;
    document.getElementById("edit-email").value = user.email;
    modal.style.display = "flex";
};

function closeModal() {
    modal.style.display = "none";
}

function saveProfile() {
    let name = document.getElementById("edit-name").value;
    let email = document.getElementById("edit-email").value;

    user.username = name;
    user.email = email;

    localStorage.setItem("currentUser", JSON.stringify(user));

    location.reload();
}

/* STATS (orders system) */
let orders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];

document.getElementById("orderCount").textContent = orders.length;

let total = 0;

orders.forEach(o => {
    total += Number(o.total);
});

document.getElementById("totalSpent").textContent = "₱" + total;

/* LOGOUT */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}