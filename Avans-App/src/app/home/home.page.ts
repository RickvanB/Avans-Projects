import {Component, ViewChild} from '@angular/core';
import {TimeslotListComponent} from './timeslot-list/timeslot-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('timeslotList', {static: false}) timeslotList: TimeslotListComponent;

  constructor() {}

  ionViewWillEnter() {
    this.timeslotList.loadTimeslots();
  }
}
