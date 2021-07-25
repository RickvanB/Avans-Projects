import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TimeslotService } from './services/timeslot.service';
import { CompanyService } from './services/company.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import localeNl from '@angular/common/locales/nl';
import {registerLocaleData} from '@angular/common';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {CommonComponentsModule} from './common-components/common-components.module';

registerLocaleData(localeNl);

@NgModule({
    declarations: [
        AppComponent
    ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TimeslotService,
    CompanyService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'nl' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
