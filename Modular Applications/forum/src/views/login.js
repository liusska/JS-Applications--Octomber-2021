import { login } from '../api/api.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { updateUserNav } from '../app.js'

const loginTemplate = (onSubmit) => html`
<div class="narrow drop center">
<header><h1>Login</h1></header>
<form @submit=${onSubmit}>
    <label><span>Email</span><input type="text" name="email"></label>
    <label><span>Password</span><input type="password" name="password"></label>
    <input class="action" type="submit" value="Sign In">
</form>
</div>`;

export function loginPage(ctx){
    ctx.render(loginTemplate(createSubmitHandler(onSubmit, 'email', 'password')));

    async function onSubmit(data){
        await login(data.email, data.password);
        ctx.updateUserNav;
        ctx.page.redirect('/topics');
    }
}

