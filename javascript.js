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

    // Retrieve users from localStorage or initialize empty object
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || {};
    // Retrieve logged-in user state
    let loggedInUser = localStorage.getItem('loggedInUser');

    // Save users to localStorage
    function saveUsers() {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    // Register form submit
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        if (username === '' || password === '') {
            alert('Username and password cannot be empty!');
            return;
        }

        if (users[username]) {
            alert('Username already exists! Please choose another.');
            return;
        }

        users[username] = password; // Warning: Insecure storage for real passwords!
        saveUsers();
        alert(`User '${username}' registered successfully!`);
        console.log('Registered Users:', users);
        showLoginForm();
        registerForm.reset();
    });

    // Login form submit
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (username === '' || password === '') {
            alert('Username and password cannot be empty!');
            return;
        }

        if (users[username] && users[username] === password) {
            loggedInUser = username;
            localStorage.setItem('loggedInUser', username);
            alert(`Welcome, ${username}! You are logged in.`);
            showSecuredPage();
            loginForm.reset();
        } else {
            alert('Invalid username or password.');
        }
    });

    // Logout button
    logoutBtn.addEventListener('click', () => {
        loggedInUser = null;
        localStorage.removeItem('loggedInUser');
        alert('You have been logged out.');
        showAuthForms();
    });

    // Show login link
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    // Show register link
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });

    // UI state management
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
        showLoginForm();
    }

    // Check initial state
    if (loggedInUser) {
        showSecuredPage();
        alert(`Welcome back, ${loggedInUser}!`);
    } else {
        showRegisterForm();
    }
});
