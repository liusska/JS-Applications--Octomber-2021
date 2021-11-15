import { logout } from './api/data.js';
import { showHomePage, showAboutPage } from './views/home.js'
import { showCatalogPage } from './views/catalog.js';
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { showSection } from './dom.js'


document.querySelector('nav').addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', onLogout);


const views = {
    'home': showHomePage,
    'catalog': showCatalogPage,
    'about': showAboutPage,
    'login': showLoginPage,
    'register': showRegisterPage
}

const links = {
    'homeBtn': 'home',
    'catalogBtn': 'catalog',
    'aboutBtn': 'about',
    'loginBtn': 'login',
    'registerBtn': 'register'
}

updateUserNav();

const ctx = {
    updateUserNav,
    goTo,
    showSection,
};

// Start application with how view
goTo('home');

function onNavigate(e){
    if(e.target.tagName == 'A'){
        const name = links[e.target.id];
        if (name) {
            e.preventDefault();
            goTo(name);
        }
    }
}

function goTo(name, ...params) {
    const view = views[name];
    if(typeof view == 'function'){
        view(ctx, ...params);
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

    await logout();

    updateUserNav();
    goTo('home');
}

