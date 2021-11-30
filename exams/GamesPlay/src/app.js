import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { logout } from './api/data.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';

/* debug */
// import * as api from './api/data.js';
// window.api = api;

const root = document.querySelector('#main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);

updateUserNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav(){
    const userData = getUserData();
    if(userData){
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    }else{
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}
