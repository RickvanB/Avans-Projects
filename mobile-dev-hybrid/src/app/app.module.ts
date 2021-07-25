import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonService } from '../app/services/pokemon.service'
import { ConnectivityService } from '../app/services/connectivity.service'
import { HttpClientModule } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { NavigationComponent } from '../app/pages/navigation/navigation.component'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx'
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PokemonService,
    SQLite,
    ConnectivityService,
    SQLitePorter,
    Geolocation,
    Network,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
