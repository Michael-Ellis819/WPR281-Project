const KEYS = {
    ISSUES: 'bts_issues',
    PEOPLE: 'bts_people',
    PROJECTS: 'bts_projects',
    AUTH: 'bts_admin_logged_in'
};

function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        localStorage.setItem(KEYS.AUTH, 'true');
        showApp();
    } else {
        alert("Incorrect Admin details. Try again!");
    }
}

function handleLogout() {
    localStorage.removeItem(KEYS.AUTH);
    location.reload();
}

function showApp() {
    if (localStorage.getItem(KEYS.AUTH) === 'true') {
        document.getElementById('login-section').classList.add('d-none');
        document.getElementById('app-content').classList.remove('d-none');
        initializeData(); 
    }
}

window.onload = showApp;

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function initializeData() {
    if (getData(KEYS.ISSUES).length === 0) {
        const initialIssues = [
            { id: 1, summary: "UI alignment issue", status: "open", priority: "high", assignedTo: "msnyman", project: "Web Portal", date: "2026-04-10" },
            { id: 2, summary: "Fix login timeout", status: "resolved", priority: "medium", assignedTo: "llane", project: "Mobile App", date: "2026-04-12" },
            { id: 3, summary: "Broken images on gallery", status: "open", priority: "low", assignedTo: "msnyman", project: "Web Portal", date: "2026-04-14" },
            { id: 4, summary: "Data not saving in Safari", status: "overdue", priority: "high", assignedTo: "llane", project: "Web Portal", date: "2026-04-01" },
            { id: 5, summary: "Update footer links", status: "open", priority: "low", assignedTo: "msnyman", project: "Legacy System", date: "2026-04-15" },
            { id: 6, summary: "API connection drop", status: "open", priority: "high", assignedTo: "llane", project: "Mobile App", date: "2026-04-16" },
            { id: 7, summary: "Slow page load speed", status: "resolved", priority: "medium", assignedTo: "msnyman", project: "Web Portal", date: "2026-04-11" },
            { id: 8, summary: "Form validation missing", status: "open", priority: "medium", assignedTo: "llane", project: "Web Portal", date: "2026-04-16" },
            { id: 9, summary: "User profile pic error", status: "overdue", priority: "medium", assignedTo: "msnyman", project: "Mobile App", date: "2026-04-05" },
            { id: 10, summary: "Terms update needed", status: "resolved", priority: "low", assignedTo: "llane", project: "Legacy System", date: "2026-04-13" }
        ];

        saveData(KEYS.ISSUES, initialIssues);
        console.log("Seed data initialized.");
    }
}

function addItem(key, newItem) {
    const currentData = getData(key);
    currentData.push(newItem);
    saveData(key, currentData);
}

function updateItem(key, updatedItem) {
    const currentData = getData(key);
    const index = currentData.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        currentData[index] = updatedItem;
        saveData(key, currentData);
    }
}

// Global accessor for Roles 2, 3, and 4
window.BTS = {
    saveData,
    getData,
    addItem,
    updateItem,
    KEYS
};