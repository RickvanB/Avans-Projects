import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../models/company';
import {CompanyService} from '../services/company.service';
import {AuthService} from '../services/auth.service';
import {TimeslotService} from '../services/timeslot.service';
import {Timeslot} from '../models/timeslot';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {

  companyId: number;
  company: Company;
  tab = 'info';
  showTabs = true;
  timeslot: Timeslot;

  constructor(
      private activatedRoute: ActivatedRoute,
      private companyService: CompanyService,
      private router: Router,
      private authService: AuthService,
      private timeslotService: TimeslotService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.companyId = parseInt(params.get('id'), 10);
      this.subscribeToTimeslotChange();
      this.handleTimeslotChange();
      this.companyService.getCompany(this.companyId).subscribe(company => this.company = company);
    });
  }

  ionViewWillEnter() {
    this.timeslotService.getTimeslotsOfStudent(this.authService.getStudent().id).subscribe(timeslots => {
      this.timeslot = timeslots.find(t => t.company.id === this.companyId);

      if (this.timeslot) {
        this.showTabs = false;
      }
    });
  }

  changeTab(name: string) {
    this.tab = name;
    this.router.navigate(['/companies/', this.companyId, name]);
  }

  private subscribeToTimeslotChange() {
    this.timeslotService.subscribeToCompanyRoom(this.companyId);
  }

  private handleTimeslotChange() {
    this.timeslotService.observeTimeslotsByCompany().subscribe(timeslot => {
      if (timeslot.company.id !== this.companyId) {
        return;
      }

      if (timeslot.student && timeslot.student.id === this.authService.getStudent().id) {
        this.showTabs = false;
      }

      if (!timeslot.student) {
        this.showTabs = true;
      }
    });
  }
}
