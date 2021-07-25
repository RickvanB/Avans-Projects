import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbilitiesPageRoutingModule } from './abilities-routing.module';

import { AbilitiesPage } from './abilities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbilitiesPageRoutingModule
  ],
  declarations: [AbilitiesPage]
})
export class AbilitiesPageModule {}
