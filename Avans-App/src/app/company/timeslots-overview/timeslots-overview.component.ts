import {Component, OnDestroy, OnInit} from '@angular/core';
import { Timeslot } from '../../models/timeslot';
import { TimeslotService } from '../../services/timeslot.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Speedmeet} from '../../models/speedmeet';
import {SpeedmeetService} from '../../services/speedmeet.service';

@Component({
  selector: 'app-timeslots-overview',
  templateUrl: './timeslots-overview.component.html',
  styleUrls: ['./timeslots-overview.component.scss'],
})
export class TimeslotsOverviewComponent implements OnInit, OnDestroy {

  visibleTimeslots: Timeslot[];
  allTimeslots: Timeslot[];
  companyId: number;
  error: any;
  student = this.authService.getStudent();
  studentTimeslots: Timeslot[];
  speedmeet: Speedmeet;
  enrollError: string;

  constructor(
      private timeslotService: TimeslotService,
      private route: ActivatedRoute,
      private alertController: AlertController,
      private authService: AuthService,
      private router: Router,
      private toastController: ToastController,
      private speedmeetService: SpeedmeetService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.companyId = parseInt(params.get('id'), 10);

        this.timeslotService.subscribeToCompanyRoom(this.companyId);
        this.getTimeslots();
        this.watchForChange();
      }
    });

    this.speedmeetService.getLatestSpeedmeet().subscribe(speedmeet => this.speedmeet = speedmeet);

    this.timeslotService.getTimeslotsOfStudent(this.student.id).subscribe(timeslots => this.studentTimeslots = timeslots);
  }

  ngOnDestroy(): void {
    this.timeslotService.unsubscribeFromCompanyRoom(this.companyId);
  }

  getTimeslots(): void {
    this.timeslotService.getTimeslotsOfCompany(this.companyId).subscribe(
      timeslots => {
        this.allTimeslots = timeslots;
        this.setVisibleTimeslots();
      },
      error => this.error = error
    );
  }

  watchForChange(): void {
    this.timeslotService.observeTimeslotsByCompany().subscribe(timeslot => {
      const index = this.allTimeslots.findIndex(item => item.id === timeslot.id);

      if (index < 0) {
        // Timeslot not in this list
        return;
      }

      // Replace timeslot in list for the newly received timeslot
      this.allTimeslots.splice(index, 1, timeslot);

      this.setVisibleTimeslots();
    });
  }

  setVisibleTimeslots(): void {
    const timeslots: Timeslot[] = [];

    for (const timeslot of this.allTimeslots) {
      if (!timeslot.student) {
        const index = timeslots.findIndex(item => item.round.id === timeslot.round.id);

        if (index < 0) {
          timeslots.push(timeslot);
        }
      }
    }

    this.visibleTimeslots = timeslots;
  }

  enroll(timeslot: Timeslot): void {
    const studentTimeslot = this.studentTimeslots.find(t => t.round.id === timeslot.round.id);

    if (studentTimeslot) {
      this.alertController.create({
        header: 'Inschrijven',
        message: `Je bent al ingeschreven op dezelfde tijd bij
          ${studentTimeslot.company.name} verwijder deze inschrijving, of kies een andere tijd.`,
        buttons: [{
          text: 'Oke'
        }]
      }).then(alert => {
        alert.present();
      });

      return;
    }

    this.alertController.create({
      header: 'Inschrijven',
      message: `Weet je zeker dat je je wilt inschrijven van ${timeslot.round.timestart} tot ${timeslot.round.timeend}?`,
      buttons: [{
        text: 'Annuleren',
        role: 'cancel',
        cssClass: 'secondary'
      }, {
        text: 'Inschrijven',
        handler: () => {
          this.timeslotService.claimTimeslot(timeslot.id).subscribe(() => {
            this.toastController.create({
              message: 'Je inschrijving is opgeslagen!',
              duration: 5000
            }).then(toast => toast.present());

            this.router.navigate(['/home']);
          });
        }
      }]
    }).then(alert => {
      alert.present();
    });
  }

  isEnrolledInRound(roundId: number): boolean {
    return this.studentTimeslots.findIndex(t => t.round.id === roundId) >= 0;
  }

  canEnroll(): boolean {
    if (this.studentTimeslots.length >= this.speedmeet.maxEnrollmentsPerStudent) {
      this.enrollError = `Je bent al voor het maximaal aantal bedrijven ingeschreven!
        Schrijf je uit bij een ander bedrijf om je voor dit bedrijf in te schrijven.`;
      return false;
    }

    if (this.studentTimeslots.findIndex(t => t.company.id === this.companyId) >= 0) {
      this.enrollError = `Je bent al ingeschreven voor dit bedrijf.`;
      return false;
    }

    return true;
  }
}
