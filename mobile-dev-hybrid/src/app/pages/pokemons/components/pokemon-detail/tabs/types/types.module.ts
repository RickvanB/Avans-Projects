import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypesPageRoutingModule } from './types-routing.module';

import { TypesPage } from './types.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypesPageRoutingModule
  ],
  declarations: [TypesPage]
})
export class TypesPageModule {}
