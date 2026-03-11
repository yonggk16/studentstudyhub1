// State checks
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function getCurrentUser() {
    return localStorage.getItem('username');
}

// Login and logout
function loginUser(username) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    updateNavigation();
    window.location.href = 'index.html';
}

function logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');
    updateNavigation();
    window.location.href = 'index.html';
}

// Navigation toggle
function updateNavigation() {
    const loggedInMenu  = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');

    if (loggedInMenu && loggedOutMenu) {
        if (isUserLoggedIn()) {
            loggedInMenu.style.display  = 'block';
            loggedOutMenu.style.display = 'none';
        } else {
            loggedInMenu.style.display  = 'none';
            loggedOutMenu.style.display = 'block';
        }
    }
}

// Auth modal states
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('open');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('open');
    }
}

// Protected links
function setupProtectedLinks() {
    const protectedLinks = document.querySelectorAll('.protected-link');

    protectedLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (isUserLoggedIn()) {
                // Logged in: navigate to real destination
                const destination = this.getAttribute('data-href');
                if (destination && destination !== '#') {
                    window.location.href = destination;
                }
            } else {
                // Not logged in: show auth modal
                openAuthModal();
            }
        });
    });
}

// Auth modal listener
function setupAuthModal() {
    const modal = document.getElementById('authModal');

    if (!modal) return;

    // Click outside modal content to close
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeAuthModal();
        }
    });
}

// Initialise on page load
document.addEventListener('DOMContentLoaded', function () {
    updateNavigation();
    setupAuthModal();
    setupProtectedLinks();
});