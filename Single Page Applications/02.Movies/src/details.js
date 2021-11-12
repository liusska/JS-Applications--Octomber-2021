import { showView } from "./dom.js";

// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('movie-details');
section.remove();

// display logic
export function showDetails(movieId){
    showView(section);
}