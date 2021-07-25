import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { CvSharedWithComponent } from './cv-shared-with/cv-shared-with.component';
import { CreditsComponent } from './credits/credits.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'cv',
    component: CvSharedWithComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
