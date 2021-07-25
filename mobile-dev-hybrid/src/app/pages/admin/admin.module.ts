import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { NewPokemonComponent } from './components/new-pokemon/new-pokemon.component';
import { ManagePokemonComponent } from './components/manage-pokemon/manage-pokemon.component';
import { RemovePokemonComponent } from './components/remove-pokemon/remove-pokemon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage, NewPokemonComponent, ManagePokemonComponent, RemovePokemonComponent]
})
export class AdminPageModule {}
