import {Component, ViewChild} from '@angular/core';
import {CompanyListComponent} from './company-list/company-list.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage {

  @ViewChild('companyList', {static: false}) companyList: CompanyListComponent;

  constructor() { }

  ionViewWillEnter() {
    this.companyList.getCompanies();
  }

}
