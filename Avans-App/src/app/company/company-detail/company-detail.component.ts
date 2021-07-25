import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Timeslot } from 'src/app/models/timeslot';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {

  company: Company;
  companyId: number;
  error: any;
  student = this.authService.getStudent();
  timeslot: Timeslot;

  constructor(
      private companyService: CompanyService,
      private route: ActivatedRoute,
      private alertController: AlertController,
      private timeslotService: TimeslotService,
      private toastController: ToastController,
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.handleTimeslotChange();

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.companyId = parseInt(params.get('id'), 10);
        this.getCompany();
      }
    });
  }

  /**
   * This method will get a specified company
   */
  getCompany(): void {
    this.companyService.getCompany(this.companyId).subscribe(
      company => {
        this.company = company;
        this.subscribeToTimeslotChange();
        this.studentHasClaimendTimeslot();
      },
      error => this.error = error
    );
  }

  private subscribeToTimeslotChange() {
    this.timeslotService.subscribeToCompanyRoom(this.companyId);
  }

  private handleTimeslotChange() {
    this.timeslotService.observeTimeslotsByCompany().subscribe(timeslot => {
      if (timeslot.company.id !== this.companyId) {
        return;
      }

      if (timeslot.student && timeslot.student.id === this.student.id) {
        this.timeslot = timeslot;
      } else if (!timeslot.student && this.timeslot && this.timeslot.id === timeslot.id) {
        this.timeslot = undefined;
      }
    });
  }

  /**
   * This method will check if a student has claimed
   * a timeslot for this company
   */
  studentHasClaimendTimeslot() {
    this.timeslotService.getTimeslotsOfStudent(this.student.id).subscribe(timeslots => {
      if (timeslots != null) {
        // Find timeslot
        this.timeslot = timeslots.find(t => t.company.id === this.companyId);
      }
    });
  }

  /**
   * Remove an enroll for a timeslot by a student
   * First ask for confirmation
   */
  removeEnroll() {
    if (!this.timeslot) {
      return;
    }

    this.alertController.create({
      header: 'Uitschrijven',
      message: `Weet je zeker dat je je wilt uitschrijven bij ${this.company.name}?`,
      buttons: [{
        text: 'Annuleren',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Uitschrijven',
        handler: () => {
          // Release the timeslot
          if (this.timeslot) {
              this.timeslotService.releaseTimeslot(this.timeslot.id).subscribe(() => {
                this.toastController.create({
                  message: 'Je inschrijving is ongedaan gemaakt',
                  duration: 5000
                }).then(toast => toast.present());
                this.router.navigate(['/home']);
              });
          }
        }
      }]
    }).then(alert => {
      alert.present();
    });
  }

  /**
   * This method will share or avoid sharing a cv with this company
   */
  shareCv() {
    if (!this.timeslot) {
      return;
    }

    this.timeslot.shareCv = !this.timeslot.shareCv;
    this.timeslotService.updateTimeslot(this.timeslot).subscribe();
  }
}
