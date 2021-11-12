import { showView } from "./dom.js";
import {showCreate} from "./create.js";

// initialization
// - find relevant section

// -detach section from DOM
const section = document.getElementById('home-page');
section.querySelector('#createLink').addEventListener('click', (e) =>{
    e.preventDefault();
    showCreate();
});

section.remove();

// display logic
export function showHome(){
    showView(section);
}