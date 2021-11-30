import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// for home page
export async function getNewGames(){
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}


// for catalog page
export async function getAllGames(){
    return api.get('/data/games?sortBy=_createdOn%20desc');
}


// for details, edit page
export async function getGameById(id){
    return api.get('/data/games/' + id);
}


// for create page 
export async function createGame(game){
    return api.post('/data/games', game);
}

// for delete item in details page
export async function deleteById(id){
    return api.del('/data/games/' + id);
}

export async function editGame(id, game){
    return api.put('/data/games/' + id, game);
}

export async function addComment(gameId, comment){
    return api.post('/data/comments', {gameId, comment});
}

export async function getComments(gameId){
    return api.post(`/data/comments?where=gameId%3D%22${gameId}%22`);
}