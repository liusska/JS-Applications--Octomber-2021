import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';



const cardTemplate = (data) => html`
<li>
    <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id=${data.id}>
            <h4>Status Code: ${data.statusCode}</h4>
            <p>${data.statusMessage}</p>
        </div>
    </div>
</li>`

start();




function start(){
    document.getElementById('allCats').appendChild(document.createElement('ul'));
    const container = document.querySelector('ul');
    container.addEventListener('click', onClick);

    onRender();

    function onClick(e){
        console.log(e.target)
        if(e.target.tagName == 'BUTTON'){
            const divStatus = e.target.parentElement.querySelector('.status');
            if(divStatus.style.display == 'block'){
                e.target.textContent = 'Show status code';
                divStatus.style.display = 'none';
            }else{
                e.target.textContent = 'Hide status code';
                divStatus.style.display = 'block';
            }
        }
    }
    function onRender(){
           render(cats.map(cardTemplate), container); 
    }


}