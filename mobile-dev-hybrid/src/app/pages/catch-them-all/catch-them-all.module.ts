import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatchThemAllPageRoutingModule } from './catch-them-all-routing.module';

import { CatchThemAllPage } from './catch-them-all.page';
import { MapComponent } from '../catch-them-all/components/map/map.component'
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { ConnectivityService } from '../../services/connectivity.service'
import { LocationService } from '../../services/location.service'
import { CatchPokemonComponent } from './components/catch-pokemon/catch-pokemon.component'
import { CatchExampleComponent } from './components/catch-example/catch-example.component';
import { Vibration } from '@ionic-native/vibration/ngx';
import { CatchSuccesfullComponent } from './components/catch-succesfull/catch-succesfull.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatchThemAllPageRoutingModule
  ],
  providers: [
    Geolocation,
    ConnectivityService,  
    LocationService,
    Vibration
  ],
  entryComponents: [CatchExampleComponent],
  declarations: [CatchThemAllPage, MapComponent, CatchPokemonComponent, CatchExampleComponent, CatchSuccesfullComponent]
})
export class CatchThemAllPageModule {}
