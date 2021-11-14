import { showView } from "./dom.js";

// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('edit-movie');
section.remove();

// display logic
export function showEdit(){
    showView(section);
}
