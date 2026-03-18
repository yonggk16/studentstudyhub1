// Modal and TOS elements
const modal = document.getElementById('termsModal');
const link = document.getElementById('tosLink');
const termsBox = document.querySelector('.terms-text');
const tosRadio = document.getElementById('tos');
const signupBtn = document.getElementById('signupButton');

// Track if user has scrolled to bottom
let hasScrolledToBottom = false;

// Open modal when clicking TOS link
link.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
});

function closeTerms() {
    modal.style.display = 'none';
    // Only check the radio button if user has scrolled to bottom
    if (hasScrolledToBottom) {
        tosRadio.checked = true;
        tosRadio.setCustomValidity(""); // Clear any previous validation error
    }
}

// Makes closeTerms globally
window.closeTerms = closeTerms;

// Enable the radio when user scrolls to bottom
termsBox.addEventListener('scroll', function() {
    const atBottom = 
        termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 5;
    
    if (atBottom) {
        hasScrolledToBottom = true;
        tosRadio.disabled = false;
    }
});

// Validation function
function validateForm() {
    const fields = {
        username: { value: document.getElementById("username").value.trim(), pattern: /^[a-zA-Z0-9_]+$/, error: "Username must contain only letters, numbers, and underscores." },
        email: { value: document.getElementById("email").value.trim(), pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, error: "Please enter a valid email." },
        password: { value: document.getElementById("password").value.trim(), pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, error: "Password must be 8+ characters with letters, numbers, and symbols." }
    };

    for (let [name, field] of Object.entries(fields)) {
        const el = document.getElementById(name);
        el.setCustomValidity(!field.value ? `${name} is required.` : !field.pattern.test(field.value) ? field.error : "");
        if (el.validationMessage) return el;
    }

    if (!hasScrolledToBottom || !tosRadio.checked) return "tos";
    return null;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const invalid = validateForm();
    
    if (invalid === "tos") {
        alert("You must read and agree to the Terms of Service.");
        modal.style.display = 'flex';
    } else if (invalid) {
        invalid.reportValidity();
    } else {
        loginUser(document.getElementById("username").value.trim());
    }
}

// Attach to forms
const form1 = document.getElementById("lsForm");
if (form1) {
    form1.addEventListener("submit", handleFormSubmit);
}