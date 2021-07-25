import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovesPageRoutingModule } from './moves-routing.module';

import { MovesPage } from './moves.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovesPageRoutingModule
  ],
  declarations: [MovesPage]
})
export class MovesPageModule {}
