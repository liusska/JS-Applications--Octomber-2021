import { page, render } from './lib.js';
import { homePage } from './views/homePage.js';
import { loginPage } from './views/login.js';
import { logout } from './api/api.js';
import { registerPage } from './views/register.js';
import { getUserData } from './util.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/my-cars.js';
import { searchPage } from './views/search.js';


/* debug */
// import * as api from './api/data.js';
// window.api = api;

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login',loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/details/:id',detailsPage );
page('/create', createPage);
page('/edit/:id', editPage);
page('/my-cars', profilePage);
page('/search', searchPage);


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
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome, ${userData.username}`;
    }else{
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}
