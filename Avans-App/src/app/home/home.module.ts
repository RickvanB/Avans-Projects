import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {TimeslotListComponent} from './timeslot-list/timeslot-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        CommonComponentsModule
    ],
  declarations: [HomePage, TimeslotListComponent]
})
export class HomePageModule {}
