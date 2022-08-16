import enviroment from "../env/enviroment";
import HttpApiService from "./HttpApiService";

const API_BASE= enviroment.url
const PROPERTIES_ENDPOINT = `${API_BASE}pokemon`;
export class PokemonApi  extends HttpApiService{
    constructor() {
        super(`${API_BASE}`);
    }

    getApiPokemon =()=>{
        const response  =  this.get(`${PROPERTIES_ENDPOINT }`);     
        return response

    }
    getApiPokemonData =(url:any )=>{
        const response = this.get(url);
        return response 
    }

}
export const PokemonApiServices =  new PokemonApi();