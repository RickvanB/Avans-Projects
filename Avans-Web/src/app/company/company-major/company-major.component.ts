import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompaniesService } from '../../services/companies.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EducationsService } from 'src/app/services/educations.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-major',
  templateUrl: './company-major.component.html',
  styleUrls: ['./company-major.component.scss']
})
export class CompanyMajorComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public educations: MatTableDataSource<any>;
  columnsToDisplay: string[] = ['Major', 'Afkorting', 'Opleiding', 'Slider'];
  company: any;
  companyMajors: any;

  constructor(
    private educationService: EducationsService,
    private companyService: CompaniesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getCompany();
    this.getMajors();
  }

  getMajors(): void {
    if (this.companyMajors === undefined) {
      this.companyMajors = [];
    }

    this.educationService.getEducations().subscribe(data => {
      data.forEach(education => {
        if (this.companyMajors.filter(x => x.id === education.id).length !== 0) {
          education.notSelected = false;
        } else {
          education.notSelected = true;
        }
      });

      this.educations = new MatTableDataSource(data);
      this.educations.paginator = this.paginator;
      this.educations.sort = this.sort;
    });
  }

  getCompany() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        const id = parseInt(params.get('id'), 10);

        this.companyService.getCompanyMajorById(id).subscribe(data => {
          this.companyMajors = data;
        });

        this.companyService.getCompanyById(id).subscribe(data => {
          this.company = data;
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.educations.filter = filterValue;
  }

  sliderChange(element) {
    const major = {
      majorIds: [element.id],
      add: false,
    };

    if (element.notSelected) {
      element.notSelected = false;
      major.add = true;
    } else {
      element.notSelected = true;
      major.add = false;
    }

    this.companyService.patchEducations(major, this.company.id).subscribe(data => {
      this.snackbar.open(data.message, 'Notificatie verbergen', {
        duration: 5000,
      });
    });
  }
}
