document.getElementById('load-character').addEventListener('click', loadCharacter);

function loadCharacter(){
    let baseUrl = 'https://swapi.dev/api';

    fetch(`${baseUrl}/people/1`)
        .then(res => res.json())
        .then((character) => {
            console.log(character);
        })
}

function oldLoadCharacter(){
    let baseUrl = 'https://swapi.dev/api';

    let promise = fetch(`${baseUrl}/people/1`);

    console.log(promise);

    promise.then((response) => {
        if (response.ok){
            let jsonResponse = response.json();
            jsonResponse.then((character) => {
                console.log(character);
            })
        }

    });
}


