function solve() {

    function depart() {
        let nextStopId = 'depot';
        let stopInfoSpan = document.querySelector('#info .info');
        let departBtn = document.getElementById('depart');
        let arriveBtn = document.getElementById('arrive');

        if(stopInfoSpan.getAttribute('data-next-stop-id') !== null){
            nextStopId = stopInfoSpan.getAttribute('data-next-stop-id')
        }

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
            .then(body => body.json())
            .then(stopInfo => {
                stopInfoSpan.setAttribute('data-stop-name', stopInfo.name);
                stopInfoSpan.setAttribute('data-next-stop-id', stopInfo.next);
                stopInfoSpan.textContent = `Next stop ${stopInfo.name}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(err => {
                stopInfoSpan.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        let stopInfospan = document.querySelector('#info .info');
        let departBtn = document.getElementById('depart');
        let arriveBtn = document.getElementById('arrive');
        let stopName = stopInfospan.getAttribute('data-stop-name');
        stopInfospan.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();