// Wait for HTML to finish loading
document.addEventListener('DOMContentLoaded', () => {
    // Button and popup
    const btn = document.getElementById('mobile-profile-btn');
    const popup = document.getElementById('mobile-profile-popup');
    // Stop the script if neither button or popup exists
    if (!btn || !popup) return;
    // Shows popup when clicked
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.toggle('show');
    });
    // Closes popup when clicking outside 
    document.addEventListener('click', (e) => {
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
            popup.classList.remove('show');
        }
    });
});
