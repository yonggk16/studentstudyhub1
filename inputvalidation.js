document.addEventListener("DOMContentLoaded", function () {

    // -------Login user function-------
    function handleLogin(username) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // Check if nav is a function then update if found
        if (typeof updateNavigation === 'function') {
            updateNavigation();
        }

        // Console log user then redirect to index.html
        console.log(`User ${username} logged in successfully`);
        window.location.href = "index.html";
    }

    // ------TOS-------
    const modal = document.getElementById('termsModal');
    const link = document.getElementById('tosLink');
    const termsBox = document.querySelector('.terms-text');
    const tosRadio = document.getElementById('tos');

    let hasScrolledToBottom = false;
    const isSignupPage = modal && link && termsBox && tosRadio;

    // Run if isSignupPage is true
    if (isSignupPage) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
        
        // Close terms box
        function closeTerms() {
            modal.style.display = 'none';
            if (hasScrolledToBottom) {
                tosRadio.checked = true;
            }
        }
        
        window.closeTerms = closeTerms;
        
        // -------Listen for scroll-------
        termsBox.addEventListener('scroll', function () {
            // Check if user is at the bottom of the terms modal
            const atBottom =
                termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 5;

            if (atBottom) {
                hasScrolledToBottom = true;
                tosRadio.disabled = false;
            }
        });
    }

    // -------Validate-------
    function validateForm() {
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        const textPattern = /^[a-zA-Z0-9_]+$/;
        if (!username.value.trim()) {
            alert("Username is required.");
            return false;
        }

        if (!textPattern.test(username.value.trim())) {
            alert("Username can only contain letters, numbers, and underscores.");
            return false;
        }

        if (email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                alert("Email is required.");
                return false;
            }
            
            if (!emailPattern.test(email.value.trim())) {
                alert("Please enter a valid email address.");
                return false;
            }
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
        if (!password.value.trim()) {
            alert("Password is required.");
            return false;
        }

        if (!passwordPattern.test(password.value.trim())) {
            alert("Password must be at least 8 characters long and contain letters, numbers, and special characters.");
            return false;
        }

        // -------Check TOS on signup-------
        if (isSignupPage) {
            if (!hasScrolledToBottom) {
                alert("Please read the full Terms of Service before signing up.");
                modal.style.display = 'flex';
                return false;
            }
            
            if (!tosRadio.checked) {
                alert("Please accept the Terms of Service to continue.");
                return false;
            }
        }

        return true;
    }

    // -------Form submission handler-------
    const form = document.getElementById("lsForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (validateForm()) {
                const username = document.getElementById("username").value.trim();
                handleLogin(username);
            }
        });
    }
});