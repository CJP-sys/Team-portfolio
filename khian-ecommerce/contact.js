// Initialize EmailJS
emailjs.init({
    publicKey: "C3vw58L36Rb8gkgm0"
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        date: new Date().toLocaleString()
    };

    // Optional: Save messages locally
    let messages =
        JSON.parse(localStorage.getItem("contactMessages")) || [];

    messages.push(contact);

    localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
    );

    // Send email
    emailjs.send(
        "service_q8xk4sv",
        "template_6xd7l7h",
        {
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message
        }
    )
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
    });
});