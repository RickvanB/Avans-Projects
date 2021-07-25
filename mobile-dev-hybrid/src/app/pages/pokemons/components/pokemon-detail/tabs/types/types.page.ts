import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/API_model';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.page.html',
  styleUrls: ['./types.page.scss'],
})
export class TypesPage implements OnInit {

  pokemonName: string
  pokemon: Pokemon
  err = false

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pokemonName = params.get('name');
      this.getDetails();
    }, err => {
      this.err = true;
      return;
    });
  }

  /**
   * Get data of the named pokemon
   */
  getDetails(){
    if(this.pokemonName != null){
      this.pokemonService.getPokemonDetails(this.pokemonName).subscribe(data =>{
        this.pokemon = data
      })
    }
  }

}
