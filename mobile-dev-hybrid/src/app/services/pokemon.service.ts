import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pokemon, PokemonWrapper } from '../models/API_model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private GET_POKEMON = `${environment.api_base}/pokemon`

  constructor(private http: HttpClient) { 
    
  }

  /**
   * This method will return a list of pokemons
   * @param limit 
   * @param offset 
   */
  getPokemons(limit: number, offset: number) : Observable<PokemonWrapper> {
    return this.http.get<PokemonWrapper>(this.GET_POKEMON + `?offset=${offset}&limit=${limit}` );
  }

  /**
   * This method will return a pokemon by searching on name
   * @param name 
   */
  getPokemonDetails(identifier: string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(this.GET_POKEMON + `/${identifier}`);
  }
}
