import { Component, OnInit, ViewChild } from '@angular/core';
import { SpeedmeetService } from '../../services/speedmeet.service';
import { CompaniesService } from '../../services/companies.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EducationsService } from 'src/app/services/educations.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class CompaniesComponent implements OnInit {

  constructor(
    private companyService: CompaniesService,
    private speedmeetService: SpeedmeetService,
    private educationService: EducationsService
  ) { }

  displayedColumns: string[] = ['companyName', 'enrollments', 'actions'];
  companies: MatTableDataSource<any>;
  speedmeet: any;
  majors: any;
  expandedCompany: any;
  allCompanies: any[];

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  isExpansionDetailRow = (i: number, row: any) => row.hasOwnProperty('detailRow');

  ngOnInit(): void {
    this.companies = new MatTableDataSource();

    this.getTimeSlots();
    this.getSpeedmeet();
    this.getMajors();
  }

  getSpeedmeet(): void {
    this.speedmeetService.getSpeedmeet().subscribe(data => {
      this.speedmeet = data;
    });
  }

  getTimeSlots(): void {
    this.companyService.getTimeSlots().subscribe(data => {
      this.allCompanies = data;
      this.paginator.page.subscribe(event => this.showPage(event.pageIndex + 1, event.pageSize));
      this.paginator.length = data.length;
      this.showPage(1, this.paginator.pageSize);
    });
  }

  showPage(page: number, pageSize: number) {
    this.expandedCompany = undefined;
    const rows = [];

    this.allCompanies.slice((page - 1) * pageSize, page * pageSize).forEach(company => rows.push(company, { detailRow: true, company}));
    this.companies = new MatTableDataSource(rows);
  }

  getMajors(): void {
    this.educationService.getEducations().subscribe(data => {
      this.majors = data;
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.companies.filter = filterValue;
  }

  getUsedTimeslots(company) {
    return company.timeslots.filter(t => t.student != null).length;
  }

  getTables(company) {
    const tables = {};

    for (const timeslot of company.timeslots) {
      let i = 1;

      while (true) {
        if (!tables[i]) {
          tables[i] = [];
        }

        if (tables[i].findIndex(t => t.round.id === timeslot.round.id) < 0) {
          tables[i].push(timeslot);
          break;
        }

        i++;
      }
    }

    return tables;
  }
}
