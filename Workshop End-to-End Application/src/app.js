import { page } from './lib.js';
import decorateContext from './middlewares/render.js';

page(decorateContext);
page('/', console.log('Home page'));
page.start();