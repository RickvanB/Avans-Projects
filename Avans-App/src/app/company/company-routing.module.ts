import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyPage } from './company.page';
import {TimeslotsOverviewComponent} from './timeslots-overview/timeslots-overview.component';
import {CompanyDetailComponent} from './company-detail/company-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'info'
      },
      {
        path: 'info',
        component: CompanyDetailComponent
      },
      {
        path: 'enroll',
        component: TimeslotsOverviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyPageRoutingModule {}
