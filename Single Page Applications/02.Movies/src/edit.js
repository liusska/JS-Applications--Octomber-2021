import { showView } from "./dom.js";
import {showHome} from "./home";

// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('edit-movie');
// const form = section.querySelector('form');
// form.addEventListener('submit', onEdit);
section.remove();

// display logic
export function showEdit(){
    showView(section);
}

async function onEdit(e){
    // e.preventDefault();
    //
    // const formData = new FormData(form);
    // console.log('edit')

    // const title = formData.get('title').trim();
    // const description = formData.get('description').trim();
    // const img = formData.get('imageUrl').trim();
    //
    // const newMovie = {
    //     title,
    //     description,
    //     img
    // }
    //
    // if (Object.values(newMovie).some(movie => movie === '')) {
    //     throw new Error('All fields are required!')
    // }
    //
    // const userData = JSON.parse(sessionStorage.getItem('userData'));
    //
    // if (!userData) {
    //     showHome();
    // }
    //
    // try{
    //     const res = await fetch('http://localhost:3030/data/movies/' + id, {
    //         method: 'put',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-Authorization': userData.token
    //         },
    //         body: JSON.stringify(newMovie)
    //     });
    //
    //     if (res.ok !== true){
    //         const error = await res.json();
    //         throw new Error(error.message)
    //     }
    //
    //     const movie = await res.json();
    //     showHome()
    //
    // }catch (err){
    //     alert(err.message);
    // }

}