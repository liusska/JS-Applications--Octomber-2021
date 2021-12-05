import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// for catalog page
export async function getAllAlbums(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

// for details, edit page
export async function getAlbumById(id){
    return api.get('/data/albums/' + id);
}


// for create page 
export async function createAlbum(album){
    return api.post('/data/albums', album);
}

// for delete item in details page
export async function deleteById(id){
    return api.del('/data/albums/' + id);
}

export async function editAlbum(id, album){
    return api.put('/data/albums/' + id, album);
}

export async function searchAlbum(query){
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}