import { searchBooks } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (books, onSearch, params='') => html`        
<section id="search-page" class="dashboard">
    <h1>Search</h1>

    <form @submit=${onSearch}>
        <input type="text" name="search" .value=${params}>   
        <input type="submit" value="Search">
    </form>

    <ul class="other-books-list">
    ${books.length == 0 
        ? html`<p class="no-books">No results!</p>` 
        : books.map(searchCard)}
    </ul>
</section>`;

const searchCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function searchPage(ctx){
    const params = ctx.querystring.split('=')[1];
    let books = [];

    if(params){
        books = await searchBooks(decodeURIComponent(params))
    }

    ctx.render(searchTemplate(books, onSearch, params));

    function onSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get('search');

        if(search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}