import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyPageRoutingModule } from './company-routing.module';

import { CompanyPage } from './company.page';
import { TimeslotsOverviewComponent } from './timeslots-overview/timeslots-overview.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {CompanyBannerComponent} from './company-banner/company-banner.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CompanyPageRoutingModule,
        CommonComponentsModule
    ],
  declarations: [
    CompanyPage,
    TimeslotsOverviewComponent,
    CompanyDetailComponent,
    CompanyBannerComponent
  ]
})
export class CompanyPageModule {}
