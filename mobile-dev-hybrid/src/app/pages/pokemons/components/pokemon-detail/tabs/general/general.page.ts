import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/API_model';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  pokemonName: string
  pokemon: Pokemon
  err = false

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pokemonName = params.get('name');
      this.getDetails();
    });
  }

  /**
   * Get data of the named pokemon
   */
  getDetails(){
    if(this.pokemonName != null){
      this.pokemonService.getPokemonDetails(this.pokemonName).subscribe(data =>{
        this.pokemon = data
      }, err => {
        this.err = true;
        return;
      })
    }
  }

}
