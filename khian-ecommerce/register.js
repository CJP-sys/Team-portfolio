const registerForm = document.getElementById("registerForm");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

// Clear inputs after reload
usernameInput.value = "";
emailInput.value = "";
passwordInput.value = "";
confirmInput.value = "";

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (fullname === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullname,
                email,
                password
            })

        });

        const data = await response.json();

        if (data.success) {

            alert(data.message);

            window.location.href = "login.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Cannot connect to the server.");

    }

});