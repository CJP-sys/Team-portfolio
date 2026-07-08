const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Clear inputs
if (emailInput && passwordInput) {
    emailInput.value = "";
    passwordInput.value = "";
}

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        try {

            const response = await fetch("http://localhost:3000/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            // Save logged-in user
            localStorage.setItem("currentUser", JSON.stringify(data.user));

            // Save JWT token
            localStorage.setItem("token", data.token);

            alert("Login Successful!");

            window.location.href = "index.html";

        } catch (error) {

            console.error(error);

            alert("Cannot connect to server.");

        }

    });

}