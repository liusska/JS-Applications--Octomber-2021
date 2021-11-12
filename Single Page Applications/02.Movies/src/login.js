import { showView } from "./dom.js";

// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('form-login');
section.remove();

// display logic
export function showLogin(){
    showView(section);
}