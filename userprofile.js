// Wait till page loads
window.addEventListener("DOMContentLoaded", function() {
    // Gets data from localStorage
    const pfp = localStorage.getItem("profileImage");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const bio = localStorage.getItem("bio");
    const about = localStorage.getItem("about");
    const defaultPfp = "profileicon.svg";

    if (document.getElementById("profileImage")) {
        document.getElementById("profileImage").src = pfp || defaultPfp;
    }

    // Navbar profile icon
       const navIcon = document.getElementById("navProfileIcon");
    if (navIcon && pfp) {
        const img = document.createElement("img");
        img.id = "navProfileIcon";
        img.src = pfp;
        img.className = "profile-icon";
        img.style.borderRadius = "50%";
        navIcon.parentNode.replaceChild(img, navIcon);
    }

    if (username && document.getElementById("displayUsername")) {
        document.getElementById("displayUsername").textContent = username;
    }

    if (email && document.getElementById("displayEmail")) {
        document.getElementById("displayEmail").textContent = email;
    }

    if (bio && document.getElementById("displayBio")) {
        document.getElementById("displayBio").textContent = bio;
    }

    if (about && document.getElementById("displayAbout")) {
        document.getElementById("displayAbout").textContent = about;
    }
});