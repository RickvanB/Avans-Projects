import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/API_model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

  offset: number
  limit: number
  err = false
  pokemons: Pokemon[]

  constructor(private pokeservice: PokemonService, private storageService: StorageService) { }

  ngOnInit() {
    this.limit = 20;
    this.offset = 0;
    this.getPokemons();
  }

  getPokemons() : void {
    this.pokeservice.getPokemons(this.limit, this.offset).subscribe(pokemons =>{
      this.pokemons = pokemons.results
      this.offset = Number(this.offset) + Number(this.limit)
    }, err => {this.err = true; return});
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.pokeservice.getPokemons(this.limit, this.offset).subscribe(pokemons =>{
        for(var i = 0; i < pokemons.results.length; i++){
          this.pokemons.push(pokemons.results[i])
        }
        this.offset += this.limit;
        infiniteScroll.target.complete();
      }, err => {this.err = true; return});
    }, 500);
  }

}
