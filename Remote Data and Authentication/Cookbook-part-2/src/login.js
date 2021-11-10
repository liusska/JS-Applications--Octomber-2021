window.addEventListener('load', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);

});

async function onLogin(e){
    e.preventDefault();
    const url = 'http://localhost:3030/users/login';
    const form = e.target
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try{
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }
        const res = await fetch(url, options);

        if (res.ok !== true){
            const error = await  res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        const token = data.accessToken;

        localStorage.setItem('token', token);

        window.location = 'index.html'

    }catch (err){
        alert(err.message);
    }

}