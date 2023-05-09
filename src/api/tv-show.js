import axios from "axios"
import { FAKE_POPULARS } from "./fake_data"
import { BASE_URL, API_KEY_PARAM } from "../config";



export class TVShowAPI {
    static async fetchPopulars(){
        // const response = await axios.get(`${BASE_URL}discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY_PARAM}`);
        // console.log(response.data.results);
        // return response.data.results;
        return FAKE_POPULARS;
        // perform request
        // return the response
    }
}