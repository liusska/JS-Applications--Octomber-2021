import { page } from './lib.js';
import notify from './middlewares/notify.js';
import decorateContext from './middlewares/render.js';
import addSession from './middlewares/session.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';

page(addSession());
page(decorateContext());
page(notify());
page('/', homePage);
page('/login', loginPage);

page.start();
