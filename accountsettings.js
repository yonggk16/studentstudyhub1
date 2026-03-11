// Default profile picture
let tempImageData = null;

// Run after page loads
window.onload = function() {

    // Saves profile picture, bio and about to localStorage
    const savedImage = localStorage.getItem("profileImage");
    const savedBio = localStorage.getItem("bio");
    const savedAbout = localStorage.getItem("about");

    // Check if data is stored 
    if (savedImage) {
        document.getElementById("profileImage").src = savedImage;
    }

    if (savedBio) {
        document.getElementById("bioInput").value = savedBio;
    }

    if (savedAbout) {
        document.getElementById("aboutInput").value = savedAbout;
    }
};

// Profile picture upload
document.getElementById("imageUpload")?.addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        tempImageData = e.target.result;
        document.getElementById("profileImage").src = tempImageData;
    };
    reader.readAsDataURL(file);
});

// Saves profile settings
function saveProfile() {
    const bio = document.getElementById("bioInput").value;
    const about = document.getElementById("aboutInput").value;

    localStorage.setItem("bio", bio);
    localStorage.setItem("about", about);

    if (tempImageData) {
        localStorage.setItem("profileImage", tempImageData);
    }

    alert("Profile saved successfully!");
}