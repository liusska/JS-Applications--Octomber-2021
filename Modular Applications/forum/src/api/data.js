import * as api from './api.js';

export async function getAllTopics(){
    return api.get('/data/topics');
}