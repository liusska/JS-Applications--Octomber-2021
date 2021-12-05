import { getUserData } from '../util.js';
import { searchAlbum } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (albums, onSearch, params='', user) => html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input .value=${params} id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${onSearch} class="button-list">Search</button>
</div>

<h2>Results:</h2>

<div class="search-result">
    ${albums.length == 0 
        ? html`<p class="no-result">No result.</p>`
        : null
    }

    ${user ? albums.map(albumCard) : albums.map(albumCardNoUser)}


</div>
</section>`;

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


export async function searchPage(ctx){
    const user = getUserData();
    const params = ctx.querystring.split('=')[1];
    let albums = [];

    if(params){
        albums = await searchAlbum(decodeURIComponent(params))
    }

    ctx.render(searchTemplate(albums, onSearch, params, user));

    function onSearch() {
        const search = document.getElementById('search-input').value;

        if(search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}