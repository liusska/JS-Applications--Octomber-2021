import { html, render } from './node_modules/lit-html/lit-html.js';

const rowTemplate = (data) =>html`
<tr class=''>
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>`

start();

document.getElementById('searchBtn').addEventListener('click', onSearch);

async function start(){
   const container = document.querySelector('.container tbody');
   const response = await(await fetch('http://localhost:3030/jsonstore/advanced/table')).json();

   render(Object.values(response).map(rowTemplate), container);
}


function onSearch(){
   let searchInput = document.getElementById('searchField');
   const searchWord = searchInput.value.toLowerCase();
   const tableElements = Array.from(document.querySelectorAll('tbody tr'));

   tableElements.forEach((el) => {
      let text = el.textContent.toLowerCase();
      if (searchWord && text.includes(searchWord)){
         el.classList.add('select');
      }else {
         el.classList.remove('select')
      }
   });

   searchInput.value = '';

}