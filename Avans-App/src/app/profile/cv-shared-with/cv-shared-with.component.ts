import { Component, OnInit } from '@angular/core';
import { Timeslot } from 'src/app/models/timeslot';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cv-shared-with',
  templateUrl: './cv-shared-with.component.html',
  styleUrls: ['./cv-shared-with.component.scss'],
})
export class CvSharedWithComponent implements OnInit {

  timeslots: Timeslot[];
  error = false;

  constructor(private timeslotService: TimeslotService, private authService: AuthService) { }

  ngOnInit() {
    const student = this.authService.getStudent();
    // Get timeslots of student if student is present
    if (student) {
      this.timeslotService.getTimeslotsOfStudent(student.id).subscribe(timeslots => {
        this.timeslots = timeslots.filter(ts => ts.shareCv);
      });
    }
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  /**
   * This method will revert permission of sharing a CV
   */
  revertPermision(timeslot: Timeslot) {
    timeslot.shareCv = false;

    // Update timeslot
    this.timeslotService.updateTimeslot(timeslot).subscribe();

    // Remove from list
    this.timeslots.splice(this.timeslots.indexOf(timeslot), 1);
  }

}
