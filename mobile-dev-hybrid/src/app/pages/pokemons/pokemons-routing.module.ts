import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonsPage } from './pokemons.page';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component'
import { MyPokemonsComponent } from './components/my-pokemons/my-pokemons.component';
import { GeneralPage } from './components/pokemon-detail/tabs/general/general.page';
import { MovesPage } from './components/pokemon-detail/tabs/moves/moves.page';
import { AbilitiesPage } from './components/pokemon-detail/tabs/abilities/abilities.page';
import { TypesPage } from './components/pokemon-detail/tabs/types/types.page';
import { GeneralPageModule } from './components/pokemon-detail/tabs/general/general.module';
import { AbilitiesPageModule } from './components/pokemon-detail/tabs/abilities/abilities.module';
import { MovesPageModule } from './components/pokemon-detail/tabs/moves/moves.module';
import { TypesPageModule } from './components/pokemon-detail/tabs/types/types.module';

const routes: Routes = [
  {
    path: '',
    component: PokemonsPage
  },
  {
    path: 'my/catches',
    component: MyPokemonsComponent
  },
  {
    path: ':name',
    component: PokemonDetailComponent,
    children: [
      {
        path: 'general/:name',
        children: [
          {
            path: '',
            loadChildren: () => GeneralPageModule
          },
        ]
      },      
      {
        path: 'abilities/:name',
        children: [
          {
            path: '',
            loadChildren: () => AbilitiesPageModule
          },
        ]
      },
      {
        path: 'moves/:name',
        children: [
          {
            path: '',
            loadChildren: () => MovesPageModule
          },
        ]
      },
      {
        path: 'types/:name',
        children: [
          {
            path: '',
            loadChildren: () => TypesPageModule
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsPageRoutingModule {}
