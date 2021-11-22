import { getMovieById } from '../api/data.js';
import { getUserData } from '../api/util.js';
import { html, until } from '../lib.js';


const detailsTemplate = (moviePromise) => html`<section id="movie-details">
        ${until(moviePromise, html`<p>Loading &hellip;</p>`)}
</section>`;


const movieTemplate = (movie) => html`
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src=${movie.img} alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${movie.isOwner 
                    ? html`<a class="btn btn-danger" href="#">Delete</a>
                        <a class="btn btn-warning" href=${`/edit/${movie._id}`}>Edit</a>` 
                    : html`<a class="btn btn-primary" href="#">Like</a>`}
                
                <span class="enrolled-span">Liked 1</span>
            </div>
        </div>
    </div>`;

export function detailsPage(ctx) {
    const movieId = ctx.params.id;
    ctx.render(detailsTemplate(loadMovie(movieId)));
}

async function loadMovie(id){
    const movie = await getMovieById(id);

    const userData = getUserData();
    if (userData && userData.id == movie._ownerId){
        movie.isOwner = true;
    }

    return movieTemplate(movie);
}