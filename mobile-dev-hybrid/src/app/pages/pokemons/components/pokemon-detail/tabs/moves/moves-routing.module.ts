import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovesPage } from './moves.page';

const routes: Routes = [
  {
    path: '',
    component: MovesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovesPageRoutingModule {}
