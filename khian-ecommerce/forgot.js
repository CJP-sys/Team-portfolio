const forgotForm =
document.getElementById("forgotForm");


const emailInput =
document.getElementById("email");


const passwordInput =
document.getElementById("newPassword");



// clear old values

emailInput.value="";
passwordInput.value="";





forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const newPassword = passwordInput.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
        alert("Account not found!");
        return;
    }

    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Password updated successfully!");
    window.location.href = "login.html";
});