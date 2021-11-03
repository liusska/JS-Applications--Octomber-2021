function resoleAfter2Seconds(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

function resoleAfter3Seconds(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved2');
        }, 3000);
    });
}

// resoleAfter2Seconds()
//     .then(result => {
//         console.log(result);
//     });

async function asyncFunc(){
    try{
        let result = await resoleAfter2Seconds();
        console.log(result);
        let result2 = await resoleAfter3Seconds()
        console.log(result2);
    }catch(error){
        console.log(error);
    }


    return "Pesho";
}

asyncFunc()
    .then(res => {
        console.log(res);
    });