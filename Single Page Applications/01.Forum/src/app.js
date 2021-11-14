import { e } from '/src/dom.js'
import { createComment } from "./comments.js";

window.addEventListener('DOMContentLoaded', start);
const mainSection = document.querySelector('main');
const sectionComments = document.getElementById('topic-title');

const commentFormField = document.querySelector('.answer-comment');

const commentFormBtn = commentFormField.querySelector('button');
commentFormBtn.addEventListener('click', createComment);

commentFormField.remove()

async function start(){
    const addBtn = document.getElementById('public');
    addBtn.addEventListener('click', createNewTopic);

    const posts = await getPosts();
    sectionComments.replaceChildren();
    posts.map(createPreview).forEach(post => sectionComments.appendChild(post));
}

async function getPosts(){
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const response = await fetch(url);
    const data = await response.json();

    return Object.values(data);
}

async function createNewTopic(e){
    e.preventDefault();
    const form = document.getElementById('addNewTopic');
    const formData = new FormData(form);

    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const topicName = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const postText = formData.get('postText').trim();

    const post = {
        topicName,
        username,
        postText,
        commentsArr: []
    }

    if (Object.values(post).some(field => field === '')) {
        throw new Error('All fields are required!')
    }

    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });

        if (res.ok === false){
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        form.reset();
        start();

    }catch (err){
        alert(err.message);
    }

}

function createPreview(post){
    const element = e('div', {className: 'topic-container'},
            e('div', {className: 'topic-name-wrapper'},
                e('div', {className: 'topic-name'},
                    e('a', {href: '#', className: 'normal'},
                        e('h2', {}, post.topicName)
                    ),
                    e('div', {className: 'columns'},
                        e('div', {},
                            e('p', {}, 'Date: ',
                                e('time', {}, '2020-10-10T12:08:28.451Z')
                            ),
                            e('div', {className: 'nick-name'},
                                e('p', {}, 'Username: ',
                                    e('span',{}, `${post.username}`)
                                )
                            )
                        )
                    )
                )
            )
        );

    element.addEventListener('click', () => {
        commentPreview(post._id, element);
    });


    return element;
}

async function commentPreview(id, preview){
    const post = await getPostById(id);
    const element = document.createElement('div');
    element.className = 'comment';
    element.innerHTML = ` <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>2020-10-10 12:08:28</time></p>

        <p class="post-content">${post.postText}</p>
    </div>`

    // <div id="user-comment">
    //     <div class="topic-name-wrapper">
    //         <div class="topic-name">
    //             <p><strong>Daniel</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
    //             <div class="post-content">
    //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere sint
    //                     dolorem quam.</p>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    mainSection.remove();
    preview.replaceWith(element);
    document.querySelectorAll('.topic-container').forEach(el => el.style.display = 'none');
    const currentPost = document.querySelector('.topic-title');
    currentPost.appendChild(commentFormField);

}

async function getPostById(id){
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts/' + id;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

