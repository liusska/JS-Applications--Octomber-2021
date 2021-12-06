import { getUserData, setUserData, clearUserData } from "../util.js";

const hostname = 'https://parseapi.back4app.com';

async function request(url, options){
    try {
        const response = await fetch(hostname + url, options);

        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.error);
        }

    return await response.json();
    }catch (err){
        alert(err.message);
        throw err;
    }

}

function createOptions(method = 'get', data){
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'QTdRXmYzhQUUv5qpmAisKoDTKc3maWnTNGliOQ0z',
            'X-Parse-REST-API-Key': 'RF2GrD5mmbwNi0cGErNNosNPkf4QsIHJCxe4YKNs'
        }
    };

    const userData = getUserData();
    if(userData){
        options.headers['X-Parse-Session-Token'] = userData.token;
    }

    if(data){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

export async function get(url){
    return request(url, createOptions());
}

export async function post(url, data){
    return request(url, createOptions('post', data));
}

export async function put(url, data){
    return request(url, createOptions('put', data));
}

export async function del(url){
    return request(url, createOptions('delete'));
}

export async function login(username, password){
    const result = await post('/login', {username, password});

    const userData = {
        username: result.username,
        id: result.objectId,
        token: result.sessionToken
    };

    setUserData(userData);

    return result;
}

export async function register(username, email, password){
    const result = await post('/users', {username, email, password});

    const userData = {
        username,
        id: result.objectId,
        token: result.sessionToken
    };

    setUserData(userData);

    return result;
}

export async function logout(){
    await post('/logout');
    clearUserData();
}