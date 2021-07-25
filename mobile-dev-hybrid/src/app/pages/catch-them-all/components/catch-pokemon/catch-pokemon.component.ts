import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Pokemon } from 'src/app/models/storage_models';
import { PopoverController, ToastController } from '@ionic/angular';
import { CatchExampleComponent } from '../catch-example/catch-example.component';
import { Vibration } from '@ionic-native/vibration/ngx';
import { LocationService } from 'src/app/services/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-catch-pokemon',
  templateUrl: './catch-pokemon.component.html',
  styleUrls: ['./catch-pokemon.component.scss'],
})
export class CatchPokemonComponent implements OnInit {

  id;
  pokemon: Pokemon
  private hasStarted: boolean
  private hasVibrated: boolean
  private isVibrating: boolean
  private wasTooEarly: boolean

  @ViewChild('start', {static: false}) startSpan;

  constructor
  (
    private activatedRoute: ActivatedRoute, 
    private storageService: StorageService,
    public popoverController: PopoverController,
    private toastController: ToastController,
    private vibration: Vibration,
    private router: Router,
    private locationService: LocationService,
    private geolocation: Geolocation
  ) 
  { 
   this.hasStarted = false;
   this.hasVibrated = false;
   this.isVibrating = false;
   this.wasTooEarly = false;
   this.pokemon = null
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getPokemon(this.id)
    });
  }

  /**
   * This method will get the data of the clicked pokemon
   * @param id 
   */
  getPokemon(id){
    // Call method to set correct pokemong
    this.storageService.getPokemon(id).then(pokemon => {
      if(pokemon != null){
        // Check if current pokemon is within range
        this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) =>{
          // Only if pokemon is within a given range. To prevent players form cheating by simple entering link
          // var result = this.locationService.pointInRange(pokemon.lat, pokemon.long, resp.coords.latitude, resp.coords.longitude, environment.range);
          if(this.locationService.pointInRange(pokemon.lat, pokemon.long, resp.coords.latitude, resp.coords.longitude, environment.range)){
            this.pokemon = pokemon;
          }
        }).catch(err => {
          this.showToast("We did not manage it to get your location. Please try again")
        })
      } else {
        this.showToast("The Pokemon does not exist")
        this.router.navigate['/']
      }
    });
  }
  /**
   * This method will present a modal with a catch tutorial
   * @param ev 
   */
  presentTutorial(ev: any) {
    const popover = this.popoverController.create({
      component: CatchExampleComponent,
      event: ev,
      translucent: true,
      cssClass: 'pop-over-info'
    });
    popover.then(popover => popover.present())
  }

  /**
   * This method will set a random moment when the phone will vibrate
   * Only than a user is able to catch the pokemon
   */
  setRandomVibration(){
    // Only one try per time
    if(!this.hasStarted){
      this.hasStarted = true;
      this.wasTooEarly = false;

      let randomTime = Math.floor(Math.random() * 60) + 10
      setTimeout(() => {
        this.isVibrating = true;
        // Check if user didn't click already
        if(!this.wasTooEarly){
          // Show message if in test environment
          if(!environment.production){
            console.log("Vibrating: Test purposes only")
          }
          this.vibration.vibrate(1000);

          // Set boolean for is vibration on false if vibration is over
          setTimeout(()=> {
            this.hasVibrated = true;
            this.isVibrating = false;
          }, 1000)
        }      
      }, (Number(randomTime) * 100))
    // Show toast if user has already started a try and missed the vibration
    } else if(this.hasStarted && this.hasVibrated) {
      this.showToast("You\'ve already started a try. Leave the window and try again")
      
    // Show toast if user is impatient because the phone did not vibrate yet
    } else{
      this.showToast("Be patient!")
    }
  }

  /**
   * This method will catch the pokemon if a user pushes the button at the right time
   */
  tryCatchPokemon(){
    if(this.hasStarted && !this.hasVibrated && this.isVibrating){
      // Player is able to catch the pokemon
      this.storageService.pokemonCauchtByPlayer(this.pokemon.id);
      this.router.navigate([`/catch/succes/${this.pokemon.id}`]);
    } else if(!this.hasStarted){
      // Hunt has not started yet
      this.showToast("To Start the hunt click on the Pokemon")
    } else if(this.hasStarted && this.hasVibrated){
      // User wat too late
      this.showToast("You were too late... try again")

      //Reset values
      this.hasStarted = false;
      this.isVibrating = false;
      this.wasTooEarly = true;
      this.hasVibrated = false;
    } else if(this.hasStarted && !this.hasVibrated && !this.isVibrating){
      this.showToast("You were too early... try again");

      //Reset values
      this.hasStarted = false;
      this.isVibrating = false;
      this.wasTooEarly = true;
      this.hasVibrated = false;
    }
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
