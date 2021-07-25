import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbilitiesPage } from './abilities.page';

const routes: Routes = [
  {
    path: '',
    component: AbilitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbilitiesPageRoutingModule {}
