import {Component, OnDestroy, OnInit} from '@angular/core';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import {TimeslotService} from '../../services/timeslot.service';
import {Timeslot} from '../../models/timeslot';
import {AuthService} from '../../services/auth.service';
import {Student} from '../../models/student';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit, OnDestroy {

  companies: Company[];
  error: any;
  student: Student;

  constructor(
      private companyService: CompanyService,
      private timeslotService: TimeslotService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.student = this.authService.getStudent();

    this.timeslotService.observeTimeslotsByCompany().subscribe(timeslot => {
      const company = this.companies.find(item => item.id === timeslot.company.id);

      if (company) {
        const index = company.timeslots.findIndex(item => item.id === timeslot.id);

        if (index >= 0) {
          company.timeslots.splice(index, 1, timeslot);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeFromCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(
        companies => {
          this.companies = companies;

          this.subscribeToCompanies();
        },
      error => this.error = error
      );
  }

  subscribeToCompanies() {
    this.companies.forEach(company => {
      this.timeslotService.subscribeToCompanyRoom(company.id);
    });
  }

  unsubscribeFromCompanies() {
    if (this.companies == null) {
      return;
    }

    this.companies.forEach(company => {
      this.timeslotService.unsubscribeFromCompanyRoom(company.id);
    });
  }

  getFreeTimeslots(company: Company): number {
    let free = 0;

    // Always return 0 when student is enrolled to this company
    if (this.studentInTimeslots(company.timeslots)) {
      return 0;
    }
    for (const timeslot of company.timeslots) {

      if (!timeslot.student) {
        free++;
      }
    }

    return free;
  }

  private studentInTimeslots(timeslots: Timeslot[]): boolean {
    return timeslots.findIndex(timeslot => timeslot.student && timeslot.student.id === this.student.id) >= 0;
  }
}
