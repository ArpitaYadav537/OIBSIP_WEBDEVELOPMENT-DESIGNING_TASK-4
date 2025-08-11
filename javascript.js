document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const showLoginLink = document.getElementById('show-login');
    const showRegisterLink = document.getElementById('show-register');

    const registerCard = document.getElementById('register-card');
    const loginCard = document.getElementById('login-card');
    const authSection = document.getElementById('auth-section');
    const securedSection = document.getElementById('secured-section');

    // --- Persistence using localStorage (INSECURE FOR REAL PASSWORDS) ---
    // Retrieve users from localStorage, or initialize an empty object
    // JSON.parse is needed because localStorage stores everything as strings.
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
    // Retrieve logged-in user state (if any)
    let loggedInUser = localStorage.getItem('loggedInUser');

    // --- Helper function to save users to localStorage ---
    function saveUsers() {
        // JSON.stringify is needed to convert the JavaScript object to a string
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    // --- Event Listeners ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission (page reload)
        const username = document.getElementById('reg-username').value.trim(); // .trim() to remove leading/trailing spaces
        const password = document.getElementById('reg-password').value.trim();

        if (username === '' || password === '') {
            alert('Username and password cannot be empty!');
            return;
        }

        if (users[username]) {
            alert('Username already exists! Please choose another.');
            return;
        }

        users[username] = password; // WARNING: Storing plain text password in localStorage!
        saveUsers(); // Save the updated users object to localStorage
        alert(User '${username}' registered successfully!);
        console.log('Registered Users (from localStorage):', users);
        showLoginForm(); // Switch to login form after successful registration
        registerForm.reset(); // Clear the registration form fields
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (username === '' || password === '') {
            alert('Username and password cannot be empty!');
            return;
        }

        // Check if the username exists AND if the provided password matches the stored password
        if (users[username] && users[username] === password) {
            loggedInUser = username;
            localStorage.setItem('loggedInUser', username); // Save logged-in state to localStorage
            alert(Welcome, ${username}! You are logged in.);
            showSecuredPage(); // Show the secured content
            loginForm.reset(); // Clear login form fields
        } else {
            alert('Invalid username or password.');
        }
    });

    logoutBtn.addEventListener('click', () => {
        loggedInUser = null;
        localStorage.removeItem('loggedInUser'); // Clear logged-in state from localStorage
        alert('You have been logged out.');
        showAuthForms(); // Show the authentication forms again
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });

    // --- UI State Management Functions ---
    function showRegisterForm() {
        registerCard.style.display = 'block';
        loginCard.style.display = 'none';
        authSection.style.display = 'block';
        securedSection.style.display = 'none';
    }

    function showLoginForm() {
        registerCard.style.display = 'none';
        loginCard.style.display = 'block';
        authSection.style.display = 'block';
        securedSection.style.display = 'none';
    }

    function showSecuredPage() {
        authSection.style.display = 'none';
        securedSection.style.display = 'block';
    }

    function showAuthForms() {
        authSection.style.display = 'block';
        securedSection.style.display = 'none';
        // Default to showing the login form when returning to auth after logout
        showLoginForm();
    }

    // Initial state check on page load
    // If a user was previously logged in (state found in localStorage), show the secured page
    if (loggedInUser) {
        showSecuredPage();
        alert(Welcome back , ${loggedInUser}!);
    } else {
        showRegisterForm();
    }
});