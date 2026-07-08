function logout() {
    localStorage.removeItem("currentUser"); // or localStorage.clear()
    window.location.href = "login.html";
}