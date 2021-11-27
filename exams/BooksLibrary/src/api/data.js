import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// for catalog page
export async function getAllBooks(){
    return api.get('/data/books?sortBy=_createdOn%20desc');
}

// // for details, edit page
export async function getBookById(id){
    return api.get('/data/books/' + id);
}

// // profile only user memes
export async function getMyBooks(userId){
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

// for create page 
export async function createBook(book){
    return api.post('/data/books', book);
}

// // for delete item in details page
export async function deleteById(id){
    return api.del('/data/books/' + id);
}

export async function editBook(id, meme){
    return api.put('/data/books/' + id, meme);
}