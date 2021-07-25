import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ToastController, Events } from '@ionic/angular';

@Component({
  selector: 'app-remove-pokemon',
  templateUrl: './remove-pokemon.component.html',
  styleUrls: ['./remove-pokemon.component.scss'],
  template: `
  <form (ngSubmit)="removePokemon()">
    <ion-item>
      <ion-label>Pokemon:</ion-label>
      <ion-select [(ngModel)]="pokemon.id" name="id">
        <ion-select-option *ngFor="let option of pokemon.onMap" value={{option.id}}>{{option.name}}</ion-select-option>
      </ion-select>
    </ion-item>
    <button ion-button type="submit" block>Remove Pokemon</button>
  </form>
`
})
export class RemovePokemonComponent implements OnInit {
  
  pokemon = {
    onMap: [],
    id: 0
  }

  constructor(private storageService: StorageService, private toastController: ToastController) { 
    this.getPokemons();
  }

  ngOnInit(){
    
  }

  /**
   * This method will get all pokemons that are currently on the map
   */
  getPokemons(){
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

  /**
   * Remove a pokemon that is currently on the map
   */
  removePokemon(){
    // Validate
    if(this.pokemon.id == 0){
      this.showToast("Please make sure all values are filled and valid")
      return;
    }
    // Update pokemon storage
    this.storageService.removePokemon(this.pokemon.id).then( () => {
      this.showToast("Pokemon is succesfully removed");
      //Clear form
      this.pokemon.id = 0,
      this.getPokemons();
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
