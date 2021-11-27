import { deleteById, getBookById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, onDelete) => html`        
<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        ${isOwner 
            ? html`<a class="button" href="/edit/${book._id}">Edit</a>
                <a class="button" @click=${onDelete} >Delete</a>
                <a class="button" href="/like">Like</a>`
            : html`<div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>`}
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;


export async function detailsPage(ctx){
    const userData = getUserData();
    const book = await getBookById(ctx.params.id);
    const isOwner = userData &&  book._ownerId == userData.id;
    
    ctx.render(detailsTemplate(book, isOwner, onDelete));
    
    async function onDelete(){
        const choise = confirm('Are you sure you want to delete this book?');
        if(choise){
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}