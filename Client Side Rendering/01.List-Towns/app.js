import {html, render} from './node_modules/lit-html/lit-html.js';

const template = (data) => html`
    <li>${data}</li>`


document.getElementById('btnLoadTowns').addEventListener('click', start);
document.getElementById('root').appendChild(document.createElement('ul'));


function start(e){
    e.preventDefault();

    const container = document.querySelector('#root ul');
    const townsInput = document.querySelector('#towns');
    const towns = (townsInput.value).split(', ');
    townsInput.value = '';

    render(towns.map(template), container);
}