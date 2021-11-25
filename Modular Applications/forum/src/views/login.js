import { html } from '../lib.js';

const loginTemplate = () => html`
<div class="narrow drop center">
<header><h1>Login</h1></header>
<form>
    <label><span>Email</span><input type="text" name="email"></label>
    <label><span>Password</span><input type="password" name="password"></label>
    <input class="action" type="submit" value="Sign In">
</form>
</div>`;

export function loginPage(ctx){
    ctx.render(loginTemplate());
}