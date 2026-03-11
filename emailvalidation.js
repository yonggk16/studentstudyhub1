document.getElementById("resetpwForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Let validation run first

    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Allows at least one char before and after '@' & '.' 
                                                     // and no spaces 
    // Show if email matches formatting
    if (emailPattern.test(email)) {
        message.style.display = "block";
        message.textContent = "If this email exists, a password reset link has been sent. Please check your inbox or junk mail.";
    } else {
        // Else does not match formatting
        message.style.display = "block";
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
    }
});