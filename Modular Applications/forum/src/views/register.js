import { html } from '../lib.js';

const registerTemplate = () => html`
<div class="narrow drop center">
<header><h1>Register</h1></header>
<form>
    <label><span>Email</span><input type="text" name="email"></label>
    <label><span>Password</span><input type="password" name="password"></label>
    <label><span>Repeat</span><input type="password" name="repass"></label>

    <input class="action" type="submit" value="Sign Un">
</form>
</div>`;

export function registerPage(ctx){
    ctx.render(registerTemplate());
}