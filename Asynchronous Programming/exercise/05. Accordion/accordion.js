window.addEventListener('DOMContentLoaded', start);


async function start() {
    const main = document.getElementById('main');
    const articles = await getArticles();
    // main.replaceChildren();
    articles.map(createPreview).forEach(el => main.appendChild(el));


}

function createPreview(article) {
    const element = document.createElement('div');
    element.className = 'accordion';
    element.innerHTML = `<div class="head">
                <span>${article.title}</span>
                <button class="button" id="${article._id}">More</button>
            </div>`;

    element.querySelector('button').addEventListener('click', () => {
        togglePreview(article._id, element);
    })

    return element;
}

async function togglePreview(id, preview) {
    const article = await getArticleById(id);

    const divElement = document.createElement('div');
    divElement.classList.add('extra')
    preview.appendChild(divElement)

    const p = document.createElement('p');
    p.textContent = article.content;

    const button = preview.querySelector('.button')

    if(button.textContent === 'More'){
        preview.appendChild(p);
        button.textContent = 'Less';
    }else{
        preview.querySelector('p').remove();
        button.textContent = 'More'

    }
}


async function getArticles() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const data = await response.json();

    return Object.values(data);
}

async function getArticleById(id) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;

    const response = await fetch(url);
    return  await response.json();

}
