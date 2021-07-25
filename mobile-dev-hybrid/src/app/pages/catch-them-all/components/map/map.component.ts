/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { ToastController, Events } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pokemon } from 'src/app/models/storage_models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor
  (
    private geolocation: Geolocation,
    public connectivityService: ConnectivityService,
    private toastController: ToastController,
    private storageService: StorageService,
    private locationSerivce: LocationService,
    private router: Router,
  )
  {
    this.markers = [];
  }

  lat: number
  long: number
  map: any
  curPos: google.maps.Marker
  markers: google.maps.Marker[]
  RANGE: number
  POKEMON_ID: string

  @ViewChild('map', {static: false}) mapElement;

  ngOnInit() {
    this.RANGE = environment.range
    this.POKEMON_ID = "POKE_ID"

    // First check the storage then insert the map
    this.storageService.checkPokemonStorage().then(()=>{
      this.getLocation();
      this.setWatchOnLocation();
    }); 
  }


  /**
   * This method will set a watch on the location of a user
   */
  setWatchOnLocation(){
    this.geolocation.watchPosition().
    subscribe((resp) => {
      if(resp.coords != null){
        if(this.lat != resp.coords.latitude && this.long != resp.coords.longitude){
          this.lat = resp.coords.latitude
          this.long = resp.coords.longitude
    
          // Update location on map
          this.updateLocation();
        }
      }
    });
  }

  /**
   * This method will get the currect location of the user
   */
  getLocation(){
    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) =>{
      if(resp.coords != null){
        this.lat = resp.coords.latitude
        this.long = resp.coords.longitude
  
        // Load map
        this.initMap();
      }
    })
    .catch(error => {
      this.showToast('Your location is needed to catch Pokemons')
    });
  }

  /**
   * This method will update the location of the user on the map
   */
  updateLocation(){
    // Remove current marker
    if(this.curPos != null){
      this.curPos.setMap(null);
    }
    
    // Set new marker 
    let coords = new google.maps.LatLng(this.lat, this.long)
    this.curPos = new google.maps.Marker({
      map: this.map,
      position: coords
    })

    // Re-center map
    this.map.center = coords
  }

  /**
   * Set all properties for the map
   */
  initMap(){
    let coords = new google.maps.LatLng(this.lat, this.long)
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP 
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    this.curPos = new google.maps.Marker({
      map: this.map,
      position: coords
    })

    // Subscripe on events where the map needs to be updated
    this.storageService.getPokemons().then(()=>{
      this.storageService.getPokemonList().subscribe(pokemons =>{
        this.addMarkers(pokemons);
      })
    })
  }

  /**
   * This method will add markers to the map
   */
  addMarkers(pokemons: Pokemon[]){
    // Remove all previous markers
    if(this.markers != null){
      for(var i = 0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
      }
    }
    // Clear list
    this.markers = [];

    if(pokemons != null){
      for(var i = 0; i < pokemons.length; i++){
        let coords = new google.maps.LatLng(pokemons[i].lat, pokemons[i].long);

        let marker: google.maps.Marker = new google.maps.Marker({
          map: this.map,
          position: coords
        })

        // Add icon if possible
        if(pokemons[i].imageUrl != null){
          marker.setIcon(pokemons[i].imageUrl)
        }

        // Add id to the marker
        marker.set(this.POKEMON_ID, pokemons[i].id)
        // Do range check
        let result = this.locationSerivce.pointInRange(pokemons[i].lat, pokemons[i].long, this.lat, this.long, this.RANGE);

        marker.addListener('click', () => {
          // Check if user is able to catch to pokemon 
          if(result){
            this.router.navigate([`/catch/trycatch/${marker.get("POKE_ID")}`])
          } else{
            this.showToast('You are to far away to catch this pokemon')
          }
        })

        this.markers.push(marker)
      }
    } else{
      this.showToast("There are no Pokemons on the map")
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
