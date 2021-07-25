import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EditDialogComponent } from 'src/app/shared/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: any;
  companyMajors: any;
  companyContact: any;
  companyId: any;

  constructor(
    private companyService: CompaniesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.companyId = params.get('id');

        this.companyService.getCompanyById(this.companyId).subscribe(data => {
          this.company = data;
        });

        this.companyService.getCompanyMajorById(this.companyId).subscribe(data => {
          this.companyMajors = data;
        });

        this.companyService.getCompanyContactById(this.companyId).subscribe(data => {
          this.companyContact = data;
        });
      }
    });
  }

  changeName() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '650px',
      data: {
        title: 'Bedrijfsnaam aanpassen',
        label: 'Bedrijfsnaam',
        inputType: 'singleLine',
        inputPlaceHolder: 'Bedrijfsnaam',
        inputValue: this.company.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.company.name = result;
        this.companyService.updateCompany(this.company, this.companyId).subscribe(data => {
          this.snackBar.open('Data is aangepast', 'Notificatie verbergen', {
            duration: 5000,
          });
        }, error => {
          let message;
          console.log(error);
          switch (error) {
            case 401:
              message = 'Wijzigen niet toegestaan';
              break;

            case 404:
              message = 'Bedrijf niet gevonden';
              break;
          }

          this.snackBar.open(message, 'Notificatie verbergen', {
            duration: 5000,
          });
        });
      }
    });
  }

  changeDescription() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '650px',
      data: {
        title: 'Bedrijfs omschrijving aanpassen',
        label: 'Bedrijfs omschrijving',
        inputType: 'multiLine',
        inputPlaceHolder: 'Bedrijfs omschrijving',
        inputValue: this.company.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.company.description = result;
        this.companyService.updateCompany(this.company, this.companyId).subscribe(data => {
          this.snackBar.open('Data is aangepast', 'Notificatie verbergen', {
            duration: 5000,
          });
        }, error => {
          let message;
          console.log(error);
          switch (error) {
            case 401:
              message = 'Wijzigen niet toegestaan';
              break;

            case 404:
              message = 'Bedrijf niet gevonden';
              break;
          }

          this.snackBar.open(message, 'Notificatie verbergen', {
            duration: 5000,
          });
        });
      }
    });
  }
}
