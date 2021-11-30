import {deleteById, getGameById} from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (game, isOwner, onDelete) => html`
<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>
    <p class="text"> ${game.summary}</p>

    ${isOwner 
        ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:" class="button">Delete</a>
        </div>`
        : null}
    
</div>`;

export async function detailsPage(ctx){
    const userData = getUserData();
    const game = await getGameById(ctx.params.id);
    const isOwner = userData &&  game._ownerId == userData.id;
    
    ctx.render(detailsTemplate(game, isOwner, onDelete));
    
    async function onDelete(){
        const choise = confirm('Are you sure you want to delete this game forever?');
        if(choise){
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}