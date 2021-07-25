import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonsPageRoutingModule } from './pokemons-routing.module';

import { PokemonsPage } from './pokemons.page';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { StorageService } from '../../services/storage.service'
import { MyPokemonsComponent } from './components/my-pokemons/my-pokemons.component';
import { GeneralPageModule } from './components/pokemon-detail/tabs/general/general.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonsPageRoutingModule
  ],
  providers: [
    StorageService,
  ],
  declarations: [PokemonsPage, PokemonListComponent, PokemonDetailComponent, MyPokemonsComponent]
})
export class PokemonsPageModule {}
