// ------State checks------
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function getCurrentUser() {
    return localStorage.getItem('username');
}

// ------Login and logout------
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

// ------Navigation toggle------
function updateNavigation() {
    const loggedInMenu  = document.getElementById('loggedInMenu');
    const loggedOutMenu = document.getElementById('loggedOutMenu');

    // Desktop
    if (loggedInMenu && loggedOutMenu) {
        if (isUserLoggedIn()) {
            loggedInMenu.style.display  = 'block';
            loggedOutMenu.style.display = 'none';
        } else {
            loggedInMenu.style.display  = 'none';
            loggedOutMenu.style.display = 'block';
        }
    }

    // Mobile
    const mobileLoggedIn  = document.getElementById('mobileLoggedIn');
    const mobileLoggedOut = document.getElementById('mobileLoggedOut');

    if (mobileLoggedIn && mobileLoggedOut) {
        if (isUserLoggedIn()) {
            mobileLoggedIn.style.display  = 'block';
            mobileLoggedOut.style.display = 'none';
        } else {
            mobileLoggedIn.style.display  = 'none';
            mobileLoggedOut.style.display = 'block';
        }
    }
}

// ------Auth modal states------
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('open');
    }
    // Close mobile profile popup if open
    const mobilePopup = document.getElementById('mobileProfilePopup');
    if (mobilePopup) {
        mobilePopup.classList.remove('show');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('open');
    }
}

// ------Protected links------
function setupProtectedLinks() {
    const protectedLinks = document.querySelectorAll('.protected-link');

    protectedLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (isUserLoggedIn()) {
                var destination = this.getAttribute('data-href');
                if (destination && destination !== '#') {
                    window.location.href = destination;
                }
            } else {
                openAuthModal();
            }
        });
    });
}

// ------Auth modal listener------
function setupAuthModal() {
    var modal = document.getElementById('authModal');

    if (!modal) return;

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeAuthModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAuthModal();
        }
    });
}

// ------Mobile profile popup------
function setupMobileProfilePopup() {
    var btn   = document.getElementById('mobile-profile-btn');
    var popup = document.getElementById('mobileProfilePopup');

    if (!btn || !popup) return;

    // Toggle popup on button tap
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        popup.classList.toggle('show');
    });

    // Close when tapping outside
    document.addEventListener('click', function (e) {
        if (!popup.contains(e.target) && !btn.contains(e.target)) {
            popup.classList.remove('show');
        }
    });

    // Close when a link inside is tapped
    popup.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            popup.classList.remove('show');
        });
    });
}

// ------Active page highlight------
function setupActivePageHighlight() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Mobile bottom nav
    document.querySelectorAll('.bottomnav-item').forEach(function (item) {
        var href = item.getAttribute('href') || 
                   item.getAttribute('data-href') || '';
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
}

// ------Initialise on page load------
document.addEventListener('DOMContentLoaded', function () {
    updateNavigation();
    setupAuthModal();
    setupProtectedLinks();
    setupMobileProfilePopup();
    setupActivePageHighlight();
});