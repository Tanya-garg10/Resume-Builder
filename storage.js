// storage.js

// Save user data to localStorage
function saveUserData(username, data) {
    if (!username || !data) return;
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    allUsers[username] = data;
    localStorage.setItem('users', JSON.stringify(allUsers));
}

// Get user data from localStorage
function getUserData(username) {
    if (!username) return null;
    const allUsers = JSON.parse(localStorage.getItem('users')) || {};
    return allUsers[username] || null;
}

// Load current user's resume data into form
function loadUserData() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    const userData = getUserData(currentUser) || {};
    if (userData.resume) {
        const resume = userData.resume;
        for (const key in resume) {
            const el = document.getElementById(key);
            if (el) {
                el.value = resume[key];
            }
        }
    }
}

// Save current resume data
function saveCurrentResume() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;
    const userData = getUserData(currentUser) || {};
    const form = document.getElementById('resume-form');
    if (!form) return;

    const resume = {};
    [...form.elements].forEach(input => {
        if (input.id) resume[input.id] = input.value;
    });

    userData.resume = resume;
    saveUserData(currentUser, userData);
}

