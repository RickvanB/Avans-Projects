import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MajorSelectPageRoutingModule } from './major-select-routing.module';

import { MajorSelectPage } from './major-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MajorSelectPageRoutingModule
  ],
  declarations: [MajorSelectPage]
})
export class MajorSelectPageModule {}
