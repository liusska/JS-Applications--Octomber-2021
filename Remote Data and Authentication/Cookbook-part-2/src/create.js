window.addEventListener('load', async () => {
    const token = localStorage.getItem('token');
    if(token === null){
        window.location = 'login.html'
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', onCreate);
});


async function onCreate(e){
    e.preventDefault();
    const url = 'http://localhost:3030/data/recipes/';
    const form = e.target;

    const formData = new FormData(form);

    const name = formData.get('name').trim().split('\n');
    const img = formData.get('img').trim().split('\n');
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');

    const recipe = {
        name,
        img,
        ingredients,
        steps
    };
    const token = localStorage.getItem('token');
    if(token === null){
        window.location = 'login.html'
        return;
    }

    try{
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(recipe)
        });

        if (res.ok !== true){
            const error = res.json();
            throw new Error(error.message)
        }

        await res.json();
        window.location = 'index.html'

    }catch (err){
        alert(err.message);
    }

}