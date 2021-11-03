let guestCount = 99;

let engagementPromise = new Promise(function (resolve, reject){
    if (guestCount > 100){
        setTimeout(function (){
            reject('Wedding too big');
        }, 1000)

    }else{
        setTimeout(function (){
            resolve('Let\'s get married');
        }, 4000);
    }
});


engagementPromise
    .then(function (message){
    console.log('promise fulfilled')
    console.log(message);
    })
    .catch(function (reason) {
        console.log('promise rejected');
        console.log(reason);
    })
    .finally(function (){
        console.log('always at the end')
    })

    console.log('preparations');

    // let alwaysReject = Promise.reject('Some reason');
    let alwaysResolve = Promise.resolve('Agree');

    // alwaysReject.catch();
    // alwaysResolve.then();

let allPromises = Promise.all([
    engagementPromise,
    alwaysResolve
]);

allPromises
    .then(function (response){
        console.log('All resolved');
    })
    .catch(function (err){
        console.log('at least one failed');
    })