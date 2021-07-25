import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatchThemAllPage } from './catch-them-all.page';
import { CatchPokemonComponent } from './components/catch-pokemon/catch-pokemon.component'
import { CatchSuccesfullComponent } from './components/catch-succesfull/catch-succesfull.component';

const routes: Routes = [
  {
    path: '',
    component: CatchThemAllPage
  },
  {
    path: 'trycatch/:id',
    component: CatchPokemonComponent
  },
  {
    path: 'succes/:id',
    component: CatchSuccesfullComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatchThemAllPageRoutingModule {}
