import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompaniesPageRoutingModule } from './companies-routing.module';

import { CompaniesPage } from './companies.page';
import { CompanyListComponent } from './company-list/company-list.component';
import {CommonComponentsModule} from '../common-components/common-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CompaniesPageRoutingModule,
        CommonComponentsModule
    ],
    declarations: [CompaniesPage, CompanyListComponent]
})
export class CompaniesPageModule {}
