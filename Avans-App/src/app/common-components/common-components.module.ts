import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CurrentSpeedmeetComponent} from './current-speedmeet/current-speedmeet.component';
import {NavbarComponent} from './navbar/navbar.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
      CurrentSpeedmeetComponent,
      NavbarComponent
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
  exports: [
      CurrentSpeedmeetComponent,
      NavbarComponent
  ]
})
export class CommonComponentsModule { }
