import axios from "axios"


const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY_PARAM = "0a7d745f1df73a81968f42baec72c7cf"

export class TVShowAPI {
    static async fetchPopulars(){
        const response = await axios.get(`${BASE_URL}discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY_PARAM}`);
        console.log(response.data.results);
        return response.data.results;
        // perform request
        // return the response
    }
}