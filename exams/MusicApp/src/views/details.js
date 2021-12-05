import {deleteById, getAlbumById} from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete) => html`        
<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src=${album.imgUrl}>
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: $${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>${album.description}</p>
        </div>

        ${isOwner 
            ? html`<div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="#" class="remove">Delete</a>
            </div>`
            : null
        }

    </div>
</div>
</section>
`;

export async function detailsPage(ctx){
    const userData = getUserData();
    const album = await getAlbumById(ctx.params.id);
    const isOwner = userData &&  album._ownerId == userData.id;
    
    ctx.render(detailsTemplate(album, isOwner, onDelete));
    
    async function onDelete(){
        const choise = confirm('Are you sure you want to delete this car forever?');
        if(choise){
            await deleteById(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}