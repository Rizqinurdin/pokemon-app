import Axios from 'axios';

export const httpService = Axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})