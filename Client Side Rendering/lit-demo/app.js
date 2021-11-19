import {render} from './node_modules/lit-html/lit-html.js';
import articleTemplate from './templates/article.js';
start();

async function start(){
    const data = await (await fetch('./data.json')).json();
    const main = document.querySelector('#content');
    const renderBtn = document.getElementById('renderBtn');
    renderBtn.addEventListener('click', onRender);

    document.getElementById('changeBtn').addEventListener('click', onChange);
        
    function onRender(){
        data[1].author += '1';
        const result = data.map(a=> articleTemplate(onSubmit.bind(null, a), a));
        render(result, main);
    }

    function onSubmit(article, event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const content = formData.get('comment');
        article.comments.push({ content });

        onRender();
    }

    function onChange(){
        data.shift();

        data.unshift({
            'title': 'First article',
            'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard',
            'author': 'John Smith',
            'comments': [],
            'isOwner': true
        });

        onRender();
    }

}


