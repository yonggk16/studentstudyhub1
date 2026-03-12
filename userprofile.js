// Wait till page loads
window.addEventListener("DOMContentLoaded", function() {
    // Gets data from localStorage
    const pfp = localStorage.getItem("profileImage");
    const username = localStorage.getItem("accountUsername");
    const email = localStorage.getItem("accountEmail");
    const bio = localStorage.getItem("bio");
    const about = localStorage.getItem("about");

    if (document.getElementById("profileImage")) {
        document.getElementById("profileImage").src = pfp || defaultPfp;
    }

    // Navbar profile icon
    if (document.getElementById("navProfileIcon")) {
        document.getElementById("navProfileIcon").src = pfp || defaultPfp;
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