import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ToastController, Events } from '@ionic/angular';

@Component({
  selector: 'app-new-pokemon',
  templateUrl: './new-pokemon.component.html',
  styleUrls: ['./new-pokemon.component.scss'],
  template: `
    <form (ngSubmit)="insertPokemon()">
      <ion-item>
        <ion-label>Pokemon:</ion-label>
        <ion-select [(ngModel)]="pokemon.name" name="name">
          <ion-select-option *ngFor="let option of pokemon.names">{{option}}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Latitude:</ion-label>
        <ion-input type="number" min="0" [(ngModel)]="pokemon.latitude" name="latitude"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Longitude:</ion-label>
        <ion-input type="number" min="0" [(ngModel)]="pokemon.longitude" name="longitude"></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Add Pokemon</button>
    </form>
  ` 
})
export class NewPokemonComponent implements OnInit {

  err = false;
  pokemon = {
    names: [],
    name: "",
    latitude: 0,
    longitude: 0
  }

  constructor(private storageService: StorageService, private pokemonService: PokemonService, private toastController: ToastController) { 
    // Get all pokemons that can be choosen
    this.pokemonService.getPokemons(300, 0).subscribe(data => {
      if(data != null && data.results != null){
        for(var i = 0; i < data.results.length; i++){
          // Get all pokemons to instert
          this.pokemon.names.push(data.results[i].name)
        }
      }
    }, err => {
      this.showToast("Make sure you're connected to the internet")
      this.err = true;
      return;
    })
  }

  ngOnInit() {}

  /**
   * Insert a new pokemon into the storage so it could be shown on the map
   */
  insertPokemon(){
    // Validate
    if(this.pokemon.name == "" || this.pokemon.latitude == 0 || this.pokemon.longitude == 0){
      this.showToast("Please make sure all values are filled and valid")
      return;
    }

    // Get pokemon to insert
    this.pokemonService.getPokemonDetails(this.pokemon.name).subscribe(pokemon =>{
      // Insert into storage so it can be placed on the map
      this.storageService.addPokemon(pokemon.name, this.pokemon.latitude, this.pokemon.longitude, pokemon.id, pokemon.sprites.front_default);
      this.showToast("Pokemon is added to the map");

      //Clear form
      this.pokemon.name = "",
      this.pokemon.latitude = 0;
      this.pokemon.longitude = 0;
    }, err =>{
      this.showToast("Make sure you're connected to the internet")
      this.err = true;
      return;
    })
  }

  /**
   * This message will display a toast
   * @param message 
   */
  private showToast(message){
    this.toastController.create({
      message: message,
      duration: 2000
    }).then( toast => {
      toast.present();
    });
  }
}
