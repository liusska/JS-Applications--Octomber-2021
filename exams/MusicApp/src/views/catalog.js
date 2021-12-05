import { getAllAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const catalogTemplate = (albums, user) => html`        
<section id="catalogPage">
<h1>All Albums</h1>
    ${albums.length == 0
        ?  html`<p>No Albums in Catalog!</p>`
        : null
    }

    ${user ? albums.map(albumCard) : albums.map(albumCardNoUser)}

</section>;`

const albumCardNoUser = (album) => html`            
<div class="card-box">
<img src=${album.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.gengre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>

</div>
</div>`;

const albumCard = (album) => html`            
<div class="card-box">
<img src=${album.imgUrl}>
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.gengre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    <div class="btn-group">
        <a href="/details/${album._id}" id="details">Details</a>
    </div>
</div>
</div>`;


export async function catalogPage(ctx){
    const user = getUserData();
    const albums = await getAllAlbums();

    ctx.render(catalogTemplate(albums, user));
}