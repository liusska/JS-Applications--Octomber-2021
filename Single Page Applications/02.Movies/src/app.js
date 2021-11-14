import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import {showRegister} from "./register.js";

// create placeholders modules for every view
// configure navigation
// implement modules
// - create async functions for requests
// - implement DOM logic

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister
};

const nav = document.querySelector('nav');

document.getElementById('logoutLink').addEventListener('click', onLogout);
nav.addEventListener('click', (e) => {
    const view = views[e.target.id];
    if (typeof view == 'function'){
        e.preventDefault();
        view();
    }
});

updateNav();
// Start application in home view(catalog)
showHome();

export function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null){
        // document.getElementById('addBtn').style.display = 'block';
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    }else{
        // document.getElementById('addBtn').style.display = 'null';
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}

async function onLogout(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    const { token }= JSON.parse(sessionStorage.getItem('userData'));
    await fetch('http://localhost:3030/users/logout', {
        headers:{
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();
}

// Order of views
// - catalog (home view)
// - login/register
// - create
// - details
// - likes
// - edit
// - delete

