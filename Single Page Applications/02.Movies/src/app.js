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

document.querySelector('nav').addEventListener('click', (e) => {
    const view = views[e.target.id];
    if (typeof view == 'function'){
        e.preventDefault();
        view();
    }
});

// Start application in home view(catalog)
showHome();


// Order of views
// - catalog (home view)
// - login/register
// - create
// - details
// - likes
// - edit
// - delete

