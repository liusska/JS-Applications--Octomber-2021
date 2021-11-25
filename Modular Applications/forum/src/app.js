import { render, page } from './lib.js';
import { homePage } from './views/home.js';
import { topicsPage } from './views/topics.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { getUserData } from './util.js';
import { logout } from './api/data.js';


const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/topics', topicsPage);
page('/login', loginPage);
page('/register', registerPage);

updateUserNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    next();
}

export function updateUserNav(){
    const userData = getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
    }else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}

async function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/');
}
