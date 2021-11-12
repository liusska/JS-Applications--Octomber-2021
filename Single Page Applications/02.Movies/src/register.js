import { showView } from "./dom.js";

// initialization
// - find relevant section
// -detach section from DOM

const section = document.getElementById('form-sign-up');
section.remove();

// display logic
export function showRegister(){
    showView(section);
}