const darkBtn = document.getElementById("dark-mode-btn");

// Load saved theme
if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");

    if (darkBtn) {
        darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (darkBtn) {
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