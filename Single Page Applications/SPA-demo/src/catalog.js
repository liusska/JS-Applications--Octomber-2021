import { showSection, e } from './dom.js';
import {updateUserNav} from "./app.js";

const section = document.getElementById('catalogSection');
const ul = section.querySelector('ul');

section.remove();


export function showCatalogPage(){
    showSection(section);

    loadMovies();
}

async function loadMovies(){
    ul.replaceChildren(e('p', {}, 'Loading....'))

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const options = {
        method: 'get',
        headers: {}
    };

    if(userData !== null){
        options.headers['X-Authorization'] = userData.token;
    }

    const res = await fetch('http://localhost:3030/data/movies', options);

    if (res.status === 403){
        sessionStorage.removeItem('userData');
        updateUserNav();
        showCatalogPage();
    }

    const movies = await res.json();

    ul.replaceChildren(...movies.map(createMovieCard));
}

function createMovieCard(movie){
    return e('li', {}, movie.title);
}