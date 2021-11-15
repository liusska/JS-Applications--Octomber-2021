import * as api from '../api/data.js';


const section = document.getElementById('loginSection');
section.remove();
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let ctx = null;

export function showLoginPage(ctxTarget){
     ctx = ctxTarget;
    ctx.showSection(section);
   
}

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    await api.login(email, password);

    ctx.updateUserNav();
    ctx.goTo('home');
}