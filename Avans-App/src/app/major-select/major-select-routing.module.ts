import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MajorSelectPage } from './major-select.page';

const routes: Routes = [
  {
    path: '',
    component: MajorSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MajorSelectPageRoutingModule {}
