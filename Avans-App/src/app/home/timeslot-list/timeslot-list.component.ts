import { Component, OnInit } from '@angular/core';
import {TimeslotService} from '../../services/timeslot.service';
import {AuthService} from '../../services/auth.service';
import {Student} from '../../models/student';
import {Timeslot} from '../../models/timeslot';
import {Router} from '@angular/router';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {Speedmeet} from '../../models/speedmeet';

@Component({
  selector: 'app-timeslot-list',
  templateUrl: './timeslot-list.component.html',
  styleUrls: ['./timeslot-list.component.scss'],
})
export class TimeslotListComponent implements OnInit {

  student: Student;
  timeslots: Timeslot[];
  error: string;
  speedmeet: Speedmeet;

  constructor(
      private timeslotService: TimeslotService,
      private authService: AuthService,
      private router: Router,
      private speedmeetService: SpeedmeetService
  ) { }

  ngOnInit() {
    this.timeslots = [];
    this.student = this.authService.getStudent();
    this.speedmeetService.getLatestSpeedmeet().subscribe(speedmeet => this.speedmeet = speedmeet);
  }

  loadTimeslots() {
    this.timeslots = [];
    this.timeslotService.getTimeslotsOfStudent(this.student.id).subscribe(
        timeslots => {
          this.timeslots = timeslots;

          this.sortTimeslots();
          this.subscribeToTimeslotChanges();
          this.handleTimeslotChange();
        },
        error => this.error = error);
  }

  private subscribeToTimeslotChanges() {
    for (const timeslot of this.timeslots) {
      this.timeslotService.subscribeToCompanyRoom(timeslot.company.id);
    }
  }

  private handleTimeslotChange() {
    this.timeslotService.observeTimeslotsByCompany().subscribe(timeslot => {
      const index = this.timeslots.findIndex(t => t.id === timeslot.id);

      if (index < 0) {
        if (timeslot.student.id !== this.student.id) {
          return;
        }

        this.timeslotService.getTimeslot(timeslot.id).subscribe(t => {
          this.timeslots.push(t);
          this.sortTimeslots();
        });
      } else if (timeslot.student === null) {
        this.timeslots.splice(index, 1);
      }
    });
  }

  gotoCompany(companyId: number) {
    this.router.navigate(['/companies', companyId]);
  }

  private sortTimeslots() {
    this.timeslots = this.timeslots.sort((a, b) => {
      const aStart = Date.parse(`2020-01-01T${a.round.timestart}`);
      const bStart = Date.parse(`2020-01-01T${b.round.timestart}`);

      if (aStart < bStart) {
        return -1;
      } else if (aStart > bStart) {
        return 1;
      }

      return 0;
    });
  }
}
