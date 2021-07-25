import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { Pokemon, Player, PokemonCatch } from '../models/storage_models';
import { Storage } from '@capacitor/core'
import { PokemonService } from './pokemon.service';
import { LocationService } from './location.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private POKEMONS_KEY = "POKEMONS"
  private USERS_KEY = "USERS"
  private BASE_VALUE = environment.amountOfPokemon
  private cur_lat;
  private cur_long;
  pokemons = new BehaviorSubject<Pokemon[]>([])
  catches = new BehaviorSubject<PokemonCatch[]>([])

  constructor(private toastController: ToastController,private pokemonService: PokemonService, private locationSerivce: LocationService, private geolocation: Geolocation, private authService: AuthService){
    this.getPokemons().then(pokemons =>{
      this.pokemons.next(pokemons)
    })
  }

  /**
   * This method will check the pokemon storage and if new pokemons need to be inserted
   */
  async checkPokemonStorage(): Promise<any>{
    // Clean Storage so the right number of pokemons can be inserted
    return this.cleanStorage().then(()=>{
          // Check if amount of pokemons is equal to the base amount
          var result = this.getPokemons();
          if(result != null){
            result.then(data => {
              if(data != null){
                if(data.length < this.BASE_VALUE){
                  return this.insertRandomPokemons(false);
                }
              } else{
               return this.insertRandomPokemons(false);
              }
            })
          } else{
            return this.insertRandomPokemons(false);
          } 
    });
  }

  /**
   * This method will generate pokemons on random locations
   * 20 is the amount of items per page
   */
  private insertRandomPokemons(userCurLocation: boolean, isAdminAction: boolean = false): Promise<any>{
    return new Promise((resolve, reject) =>{
      return this.pokemonService.getPokemons(20, 0).subscribe(data => {
        //Find random Pokemon
        var pages = (data.count / 20)
  
        var page = Math.floor(Math.random() * (pages - 2)) + 1
  
        this.pokemonService.getPokemons(20, (20 * page)).subscribe(pokemons =>{
          if(pokemons.results.length > 0){
            // Check how many pokemons needs to be insterted
            var result = this.getPokemons();
            var toInsert = environment.amountOfPokemon;
  
            if(result != null){
                result.then(existingPokemons => {     
                  if(existingPokemons != null){
                    toInsert = (existingPokemons.length - this.BASE_VALUE);
                  }
                })
            }

            // Get random factor to prevent from getting same pokemons each time
            var factor = Math.floor(Math.random() * (pokemons.results.length - toInsert))
            // Insert random pokemons
            for(var i = 0; i < toInsert; i++){
              // Check if index exists
              var pokemonToInsert = pokemons.results[i]
              if(pokemons.results[i + factor] != null){
                pokemons.results[i + factor];
              }

              this.pokemonService.getPokemonDetails(pokemonToInsert.name).subscribe(pokemonToInsert => {
                if(pokemonToInsert != null){
                  // Insert at random location
                  let geolocation;
                  // If not current location --> Use base location
                  if(userCurLocation){
                    geolocation = this.locationSerivce.generateRandomPoint(this.cur_lat, this.cur_long, environment.rangeFromCenter)
                  } else{
                    geolocation = this.locationSerivce.generateRandomPoint(environment.centerLat, environment.centerLong, environment.rangeFromCenter)
                  }

                  var updateObservable = true;
                  this.addPokemon(pokemonToInsert.name, geolocation.lat, geolocation.lng, pokemonToInsert.id, pokemonToInsert.sprites.front_default, updateObservable)
                }
              }, err =>{
                return reject()
              })
            }
            return resolve()
          }
        }, err => {
          return reject()
        })
      })
    })
  }

  /**
   * Insert a new pokemon into the database
   */
  addPokemon(name: string, lat: number, long: number, id: number, imageUrl: string, insertNext = true): boolean{
    // Check if pokemon is unique
    if(!this.pokemonExists(name)){
      var result = this.getPokemons()

      var pokemonsList = []
      if(result != null){
        result.then(pokemons => {
          if(pokemons != null){
            pokemonsList = pokemons
          }
          pokemonsList.push({
            name: name,
            lat: lat,
            long: long,
            id: id,
            imageUrl: imageUrl
          }) 
          // Save in local storage
          Storage.set({key: this.POKEMONS_KEY, value: JSON.stringify(pokemonsList)}).catch(err => {
            this.showToast("Adding Pokemon has failed. Clear your Storage on the admin page")
          })

          if(insertNext){
            this.pokemons.next(pokemonsList);
          }

          return true;
        })    
      }
    } 
    return false;
  }

  /**
   * This method will check if a pokemon allready exists
   * @param name 
   */
  private pokemonExists(name: string){
      var result = this.getPokemons()

      if(result != null){
        result.then(pokemons =>{
          if(pokemons != null){
            for(var i = 0; i < pokemons.length; i++){
              if(pokemons[i].name == name){
                return true;
              }
            }
          }
          return false;
        })
      } else {
        return false
      }  
  }

  /**
   * Get all pokemons
   */
  async getPokemons() : Promise<Pokemon[]> {
    var pokemonsList;
    try{
      pokemonsList = JSON.parse(await (await Storage.get({key: this.POKEMONS_KEY})).value)
    } catch{
      pokemonsList = [];
    }
    return pokemonsList;
  }

  /**
   * This method will set the pokemon value for a pokemon seared by id
   * @param id 
   */
  getPokemon(id: number) : Promise<Pokemon>{
    var result = this.getPokemons()

    if(result != null){
      return result.then(pokemons =>{
        if(pokemons != null){
          for(var i = 0; i < pokemons.length; i++){
            if(pokemons[i].id == id){
              return pokemons[i];
            }
          }
        }
      })
    }  
  }

  /**
   * This method will update an existing pokemon
   * @param latitude 
   * @param longitude 
   * @param id 
   */
  updatePokemon(latitude: number, longitude: number, id: number, insertNext = true): Promise<boolean>{
    return this.getPokemons().then(pokemons => {
      if(pokemons != null){
        for(var i = 0; i < pokemons.length; i++){
          // Find pokemon to update
          if(pokemons[i].id == id){
            //Update values
            pokemons[i].lat = latitude;
            pokemons[i].long = longitude;

            //Save updated list
            Storage.set({key: this.POKEMONS_KEY, value: JSON.stringify(pokemons)}).catch(err => {
              this.showToast("Updating Pokemon has failed. Clear your Storage on the admin page")
            })
            if(insertNext){
              this.pokemons.next(pokemons);
            }
            return true;
          }
        }
      }

      return false;
    })
  }

  /**
   * This method will remove a specified pokemon from the storage
   * @param id 
   */
  removePokemon(id: number, insertNext = true): Promise<any> {
    return this.getPokemons().then(pokemons => {
      if(pokemons != null){
        var pokemonsToKeep: Pokemon[] = []
        for(var i = 0; i < pokemons.length; i++){
          // Only keep if it's not the pokemon to delete
          if(pokemons[i].id != id){
            pokemonsToKeep.push(pokemons[i])
          }
        }
        // Save new list
        Storage.set({key: this.POKEMONS_KEY, value: JSON.stringify(pokemonsToKeep)}).catch(err => {
          this.showToast("Removing Pokemon has failed. Clear your Storage on the admin page")
        })
        if(insertNext){
          this.pokemons.next(pokemonsToKeep);
        }
      }
    })
  }

  /**
   * This method will registrate a catch by user
   * @param id 
   */
  pokemonCauchtByPlayer(id: number){
    var userId = this.authService.getCredentials();
    // Check credentials
    if(userId == null){
      return;
    }
    
    Storage.get({key: this.USERS_KEY}).then(users => {
      var userList: Player[]
      if(users != null){
        try{
          userList = JSON.parse(users.value)
        } catch{
          userList = [];
        }

        // Check if user exists
        if(userList == null){
          userList = [];
        }

        var index = null;
        for(var i = 0; i < userList.length; i++){
          if(userList[i].id == userId){
            index = i;
          }
        }
        // Find pokemon
        this.getPokemon(id).then(pokemon => {    
          // Pokemon can not be found so return
          if(pokemon == null){
            return;
          }

          this.getNextPosition().then(nextPost => {
            var pokemonCatch: PokemonCatch = {
              pokemonId: pokemon.id,
              catchDate: new Date(),
              lat: pokemon.lat,
              long: pokemon.long,
              pokemon: null,
              position: nextPost
            }

            // Remove pokemon from the map
            this.removePokemon(pokemon.id, false).then(()=>{
              // Notice checker method that there is one pokemon missing from now on
              this.insertRandomPokemons(true).then(()=>{
                //Update List
                this.getPokemons().then(pokemons =>{
                  this.pokemons.next(pokemons)

                  // Create user if not exists & attach the pokemon
                  if(index == null){
                    userList.push({
                      id: userId,
                      name: "player" + userId,
                      password: "err",
                      pokemonCatches: [pokemonCatch]
                    })
                  } else {
                    userList[index].pokemonCatches.push(pokemonCatch)
                  }

                  // Save user with new catches
                  Storage.set({key: this.USERS_KEY, value: JSON.stringify(userList)})
                  .catch(err => {
                    this.showToast("Catching Pokemon has failed. Clear your Storage on the admin page")
                  })
                })
              });
            });     
          })
        })
      }
    })
  }

  /**
   * This method will get the next free index
   * @param user_id 
   */
  getNextPosition() : Promise<number>{
    return this.getCatches().then(catches => {
      var highest = 0;

      // If there are no catches yet return base position
      if(catches == null){
        return highest;
      }
      // Search highest postion
      for(var i = 0; i < catches.length; i++){
        if(catches[i].position > highest){
          highest = catches[i].position;
        }
      }
      return highest + 1;
    })

  }

  private reOrderList(): Promise<any>{
    return Storage.get({key: this.USERS_KEY}).then(users => {
      var userId = this.authService.getCredentials();

      // Check credentails
      if(userId == null){
        return null;
      }

      if(users != null){
        var userList: Player[]
        try{
          userList = JSON.parse(users.value)
        } catch {
          userList = []
        }


        // Check if user exists
        if(userList == null){
          return;
        }

        for(var i = 0; i < userList.length; i++){
          if(userList[i].id == userId){
            // Swap positions
            if(userList[i] != null){
              if(userList[i].pokemonCatches != null){
                  // Search catches on given positions
                  userList[i].pokemonCatches.sort(function(a, b){return a.position-b.position})

                  for(var j = 0; j < userList[i].pokemonCatches.length; j++){
                    userList[i].pokemonCatches[j].position = j
                  }

                  // Save new list
                  return Storage.set({key: this.USERS_KEY, value: JSON.stringify(userList)}).catch(err => {
                    this.showToast("Swapping positions has failed. Clear your Storage on the admin page")
                  })
                }
              }
            }
          }
        }
      })
  }

  /**
   * Swap to catches within the list of catches based on position
   * @param user_id 
   * @param curPosition 
   * @param newPostion 
   */
  swapPosition(curPosition: number, newPostion: number) : Promise<any>{
    return this.reOrderList().then(()=>{
      return Storage.get({key: this.USERS_KEY}).then(users => {
        var userId = this.authService.getCredentials();
  
        // Check credentails
        if(userId == null){
          return null;
        }
  
        if(users != null){
          var userList: Player[]
          try{
            userList = JSON.parse(users.value)
          } catch {
            userList = []
          }
  
  
          // Check if user exists
          if(userList == null){
            userList = [];
          }
          for(var i = 0; i < userList.length; i++){
            if(userList[i].id == userId){
              // Swap positions
              if(userList[i] != null){
                if(userList[i].pokemonCatches != null){
                    // Search catches on given positions
                    for(var j = 0; j < userList[i].pokemonCatches.length; j++){
                      if(userList[i].pokemonCatches[j].position == curPosition){
                        userList[i].pokemonCatches[j].position = newPostion;
                      } else if(userList[i].pokemonCatches[j].position == newPostion){
                        userList[i].pokemonCatches[j].position = curPosition;
                      }
                    }
                    // Save new list
                    Storage.set({key: this.USERS_KEY, value: JSON.stringify(userList)}).catch(err => {
                      this.showToast("Swapping positions has failed. Clear your Storage on the admin page")
                    })
                  }
                }
              }
            }
          }
        
      })
    })
  }

  /**
   * This method will return an observable list of catches
   */
  getCatchesList() : Observable<PokemonCatch[]> {
    return this.catches.asObservable();
  }

  /**
   * This method will return an observable list of catches
   */
  getPokemonList() : Observable<Pokemon[]> {
    return this.pokemons.asObservable();
  }
  
  /**
   * This method will return the catches of a specified user
   * @param user_id 
   */
  getCatches(): Promise<PokemonCatch[]>{
    return Storage.get({key: this.USERS_KEY}).then(users => {
      var userId = this.authService.getCredentials();

      // Check credentails
      if(userId == null){
        return [];
      }

      if(users != null){
        var userList: Player[]
        try{
          userList = JSON.parse(users.value)
        } catch{
          userList = []
        }
 
        var user: Player;

        // Find the user
        if(userList == null){
          return null;
        }

        for(var i = 0; i < userList.length; i++){
          if(userList[i].id == userId){
            user = userList[i];
          }
        }

        if(user != null){
          this.catches.next(user.pokemonCatches)
          return user.pokemonCatches
        }
      }
    })
  }

  /**
   * This method will clear the users storage and will spawn new Pokemons
   */
  async clearStorage(userCurLocation: boolean, clearTotal: boolean = false){
    if(clearTotal){
      await Storage.clear();
      return;
    }

    await Storage.set({key: this.POKEMONS_KEY, value: null}).then(()=>{

      if(userCurLocation){
        return this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) =>{
          this.cur_lat = resp.coords.latitude
          this.cur_long = resp.coords.longitude
          return this.insertRandomPokemons(userCurLocation, true).then(()=>{
              //Update Map
              return this.getPokemons().then(data => {
                if(data != null){
                  var pokemons: Pokemon[] = data;
                  // Notify observers
                  this.pokemons.next(pokemons);
                }
              })
          });
        })
      } else{
        return this.insertRandomPokemons(userCurLocation, true).then(()=>{
          //Update Map
          return this.getPokemons().then(data => {
            if(data != null){
              var pokemons: Pokemon[] = data;
              // Notify observers
              this.pokemons.next(pokemons);
            }
          })
        });
      }
    }).catch(err => {
      this.showToast("Clearing Storage has failed")
    })
  }

  /**
   * This method will remove all pokemons without location values.
   */
  cleanStorage(): Promise<any>{
    return this.getPokemons().then(pokemons => {
      if(pokemons != null){
        var cleanedList: Pokemon[] = []
        for(var i = 0; i < pokemons.length; i++){
          if(pokemons[i].lat != null && pokemons[i].long != null){
            cleanedList.push(pokemons[i])
          }
        }
        // Save the cleaned list
        return Storage.set({key: this.POKEMONS_KEY, value: JSON.stringify(cleanedList)}).catch(err => {
          this.showToast("Cleaning Storage has failed")
        })
      }
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
