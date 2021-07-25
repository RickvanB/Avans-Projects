import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { CvSharedWithComponent } from './cv-shared-with/cv-shared-with.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, CvSharedWithComponent, CreditsComponent]
})
export class ProfilePageModule {}
