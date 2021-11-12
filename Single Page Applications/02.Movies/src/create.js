import { showView } from "./dom.js";

// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('add-movie');
section.remove();

// display logic
export function showCreate(){
    showView(section);
}