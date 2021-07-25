import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Pokemon } from 'src/app/models/storage_models';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-catch-succesfull',
  templateUrl: './catch-succesfull.component.html',
  styleUrls: ['./catch-succesfull.component.scss'],
})
export class CatchSuccesfullComponent implements OnInit {

  private id;
  pokemon: Pokemon

  constructor
  (
    private activatedRoute: ActivatedRoute, 
    private storageService: StorageService,
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getPokemon(this.id);
    });
  }

  /**
   * This method will get the data of the clicked pokemon
   * @param id 
   */
  getPokemon(id){
    // Call method to set correct pokemong
    // this.storageService.getPokemon(id);
    this.storageService.getPokemon(id).then(pokemon => {
      // Check if current pokemon is within range
      this.pokemon = pokemon;
    });
  }

}
