import { render, page } from './lib.js';
import { homePage } from './views/home.js';
import { topicsPage } from './views/topics.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';


const root = document.querySelector('main');

page(decorateContext);
page('/', homePage);
page('/topics', topicsPage);
page('/login', loginPage);
page('/register', registerPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    next();
}