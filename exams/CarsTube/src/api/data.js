import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// for catalog page
export async function getAllCars(){
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

// for details, edit page
export async function getCarById(id){
    return api.get('/data/cars/' + id);
}

// profile only user cars
export async function getMyCars(userId){
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

// for create page 
export async function createCar(car){
    return api.post('/data/cars', car);
}

// for delete item in details page
export async function deleteById(id){
    return api.del('/data/cars/' + id);
}

export async function editCar(id, car){
    return api.put('/data/cars/' + id, car);
}

// serach by year functionality
export async function searchCar(query){
    return api.get('/data/cars?where=year%3D' + encodeURIComponent(`${query}`));
}