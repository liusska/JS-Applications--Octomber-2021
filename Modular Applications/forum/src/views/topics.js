import { html } from '../lib.js';

const topicsTemplate = () => html`
<h1>Topics</h1>
<div>
    <article class="preview drop">
        <header><a href="#">Topic Title 1</a></header>
        <div>
            <div>Comments: 15</div>
        </div>
    </article>
    <article class="preview drop">
        <header><a href="#">Topic Title 2</a></header>
        <div>
            <div>Comments: 15</div>
        </div>
    </article>
    <article class="preview drop">
        <header><a href="#">Topic Title 3</a></header>
        <div>
            <div>Comments: 15</div>
        </div>
    </article>
</div>`;

export function topicsPage(ctx){
    ctx.render(topicsTemplate());
}