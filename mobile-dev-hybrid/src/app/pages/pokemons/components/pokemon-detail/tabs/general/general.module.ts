import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';
import { PokemonService } from '../../../../../../services/pokemon.service'
import { GeneralPage } from './general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralPageRoutingModule
  ],
  providers: [PokemonService],
  declarations: [GeneralPage]
})
export class GeneralPageModule {}
