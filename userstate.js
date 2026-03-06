// ================================================
// userstate.js — Authentication State Management
// ================================================

// ---------- State Checkers ----------

function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function getCurrentUser() {
    return localStorage.getItem('username');
}

// ---------- Login / Logout ----------

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

// ---------- Navigation Toggle ----------

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

// ---------- Auth Modal Controls ----------

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

// ---------- Protected Link Enforcement ----------

function setupProtectedLinks() {
    const protectedLinks = document.querySelectorAll('.protected-link');

    protectedLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (isUserLoggedIn()) {
                // Logged in — navigate to real destination
                const destination = this.getAttribute('data-href');
                if (destination && destination !== '#') {
                    window.location.href = destination;
                }
            } else {
                // Not logged in — show auth modal
                openAuthModal();
            }
        });
    });
}

// ---------- Modal Event Listeners ----------

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

// ---------- Initialise Everything on Page Load ----------

document.addEventListener('DOMContentLoaded', function () {
    updateNavigation();
    setupAuthModal();
    setupProtectedLinks();
});