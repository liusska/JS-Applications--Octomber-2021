import {html, render} from './node_modules/lit-html/lit-html.js';

const dropTemplate = (data) => html`
<option value="${data._id}">${data.text}</option>`;

const form = document.querySelector('form');
form.addEventListener('submit', createDrop);

start()

async function start(){
    const cities = await(await fetch('http://localhost:3030/jsonstore/advanced/dropdown')).json();

    const container = document.getElementById('menu');

    render(Object.values(cities).map(c => dropTemplate(c)), container)
    
}

async function createDrop(e){
    e.preventDefault();

    const textInput = document.getElementById("itemText");
    const text = textInput.value;

    if(text == ''){
        alert('All fields are required!');
        throw new Error('All fields are required!');
    }

    const result = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text})
    });

    form.reset();
    await result.json();
    start();
}



