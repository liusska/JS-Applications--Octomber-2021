import { showHomePage, showAboutPage } from './home.js'
import { showCatalogPage } from './catalog.js';
import {showLoginPage} from "./login.js";
import {showRegisterPage} from "./register.js";

document.querySelector('nav').addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', onLogout);

const sections = {
    'homeBtn': showHomePage,
    'catalogBtn': showCatalogPage,
    'aboutBtn': showAboutPage,
    'loginBtn': showLoginPage,
    'registerBtn': showRegisterPage,
}
updateUserNav()

// Start application with how view
showHomePage();

function onNavigate(e){
    if(e.target.tagName === 'A'){

        const view = sections[e.target.id];
        if(typeof view === 'function'){
            e.preventDefault();
            view();
        }
    }
}

export function updateUserNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null){
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
    }else{
        document.getElementById('userNav').style.display = 'none';
        document.getElementById('guestNav').style.display = 'inline-block';
    }
}

async function onLogout(e){
    e.stopImmediatePropagation();
    const { token } = JSON.parse(sessionStorage.getItem('userData'));

    const res = await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    showHomePage();
}

