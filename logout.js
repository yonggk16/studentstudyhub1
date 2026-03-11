// Open modal for logout
function openModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close modal for logout
function closeModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Calls closeModal then logs user out
function logout() {
    closeModal();
    if (typeof logoutUser === 'function') {
        logoutUser();
    }
}