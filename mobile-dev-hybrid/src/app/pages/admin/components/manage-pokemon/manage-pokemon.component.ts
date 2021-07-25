import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ToastController, Events } from '@ionic/angular';

@Component({
  selector: 'app-manage-pokemon',
  templateUrl: './manage-pokemon.component.html',
  styleUrls: ['./manage-pokemon.component.scss'],
  template: `
    <form (ngSubmit)="updatePokemon()">
      <ion-item>
        <ion-label>Pokemon:</ion-label>
        <ion-select [(ngModel)]="pokemon.id" name="id" (ionChange)="updateFields($event)">
          <ion-select-option *ngFor="let option of pokemon.onMap" value={{option.id}}>{{option.name}}</ion-select-option>
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
      <button ion-button type="submit" block>Update Pokemon</button>
    </form>
  `
})
export class ManagePokemonComponent implements OnInit {

  pokemon = {
    onMap: [],
    id: 0,
    latitude: 0,
    longitude: 0
  }

  constructor(private storageService: StorageService, private toastController: ToastController) { 
    // Get all pokemons that can be choosen
    this.storageService.getPokemons().then(data => {
      this.storageService.getPokemonList().subscribe(pokemons =>{
        if(pokemons != null){
          this.pokemon.onMap = []
          for(var i = 0; i < pokemons.length; i++){
            // Get all pokemons to instert
            this.pokemon.onMap.push(pokemons[i])
          }
        }
      })
    })
  }

  ngOnInit() {}

  /**
   * This method will update the form fields after a click in the selection area
   * @param name 
   */
  updateFields(event){
    this.storageService.getPokemon(event.target.value).then(pokemon => {
      if(pokemon != null){
        this.pokemon.latitude = pokemon.lat;
        this.pokemon.longitude = pokemon.long;
      }
    })
  }

  /**
   * Update an existing pokemon on the map
   */
  updatePokemon(){
    // Validate
    if(this.pokemon.id == 0 || this.pokemon.latitude == 0 || this.pokemon.longitude == 0){
      this.showToast("Please make sure all values are filled and valid")
      return;
    }
     // Update pokemon storage
     this.storageService.updatePokemon(this.pokemon.latitude, this.pokemon.longitude, this.pokemon.id).then(result => {
       if(result){
        this.showToast("Pokemon is succesfully updated");

         //Clear form
        this.pokemon.id = 0,
        this.pokemon.latitude = 0;
        this.pokemon.longitude = 0;
       } else{
        this.showToast("Updating the pokemon has failed");
       }
     });
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
