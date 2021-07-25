import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PokemonCatch } from '../../../../models/storage_models'
import { PokemonService } from 'src/app/services/pokemon.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.scss'],
})
export class MyPokemonsComponent implements OnInit {

  catches: PokemonCatch[]
  err = false;

  constructor(private storageService: StorageService, private pokemonService: PokemonService, private toastController: ToastController) { }

  ngOnInit() {
    this.getPlayerCatches()
  }

  /**
   * Get all the catches of a player
   */
   getPlayerCatches(): Promise<any>{
    return this.storageService.getCatches().then(() => {
      this.storageService.getCatchesList().subscribe(catches => {
        if(catches != null){
          for(var i = 0; i < catches.length; i++){
            // Get details of pokemon
             this.pokemonService.getPokemonDetails(catches[i].pokemonId.toString()).subscribe(pokemonDetails => {
              if(pokemonDetails != null) {
                for(var j = 0; j < catches.length; j++) {
                  // Attach details to correct catch
                  if(catches[j].pokemonId == pokemonDetails.id) {
                    catches[j].pokemon = {
                      id: pokemonDetails.id,
                      lat: null,
                      long: null,
                      imageUrl: pokemonDetails.sprites.front_default,
                      name: pokemonDetails.name
                    }
                  }
                }   
              }
            }, onerror => { this.err = true; return; })
          }
          // Order by Position ASC
          catches.sort(function(a, b){return a.position-b.position})
        }  
        this.catches = catches
      })
    });
  }

  /**
   * Set new position in list
   * @param event 
   */
  reorderItems(event)
  {
    // Save new order in list
    this.storageService.swapPosition(event.detail.from, event.detail.to)
    event.detail.complete();
  }

  /**
   * This method will be called if a user want's to refresh the list
   * @param event 
   */
  refreshCatches(event)
  {
    var cur_catches = this.catches;
      // If completed hide refresher after 2 seconds
      setTimeout(() => {
        // Get catches of user
        this.getPlayerCatches().then(()=>{
          // Check if there are any changes
          var changes = true;
          if(cur_catches.length == this.catches.length){
            for(var i = 0; i < cur_catches.length; i++){
              if(cur_catches[i] != this.catches[i]){
                changes = true
              }
            }
          }
          //Show result
          if(changes){
            this.showToast("Changes are applied")
          } else {
            this.showToast("No changes! We're up-to-date :)")
          }
          event.target.complete();
        });
      }, 2000);
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
