import { showView } from "./dom.js";
import { showHome } from "./home.js";


// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();



// display logic
export function showCreate(){
    showView(section);
}


async function onCreate(e){
    e.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();

    const newMovie = {
        title,
        description,
        img
    }

    if (Object.values(newMovie).some(movie => movie === '')) {
        throw new Error('All fields are required!')
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData === null) {
        showHome();
    }

    try{
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(newMovie)
        });

        if (res.ok !== true){
            const error = await res.json();
            throw new Error(error.message)
        }

        const movie = await res.json();
        form.reset()
        showHome()

    }catch (err){
        alert(err.message);
    }

}