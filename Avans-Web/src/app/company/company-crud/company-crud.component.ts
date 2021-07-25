import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompaniesService } from '../../services/companies.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { CompanyStatusValue } from 'src/app/enum/company-status-value';
import { CompanyStatus } from 'src/app/enum/company-status';

@Component({
  selector: 'app-company-crud',
  templateUrl: './company-crud.component.html',
  styleUrls: ['./company-crud.component.scss']
})
export class CompanyCrudComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'opties'];
  dataSource: MatTableDataSource<any>;
  status: any;
  statusInt: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private companyService: CompaniesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.status = CompanyStatusValue;
    this.statusInt = CompanyStatus;
    this.companyService.getAllCompanies().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCompany(id: any, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Weet je het zeker?',
        message: 'Weet je zeker dat je dit bedrijf wilt verwijderen? Dit zal alle studenten uitschrijven.',
        extra: name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.deleteCompanyById(id).subscribe(data => {
          this.snackBar.open('Data is verwijdert', 'Notificatie verbergen', {
            duration: 5000,
          });

          this.ngOnInit();
        }, error => {
          let message;
          console.log(error);
          switch (error) {
            case 401:
              message = 'Verwijderen niet toegestaan';
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

  exportToExcel() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Overzicht downloaden',
        message: 'Weet je zeker dat je onderstaande overzicht wilt downloaden',
        extra: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data.filter(c => c.status === 2));

        ws['!cols'] = [
          { width: 10 },
          { width: 25 },
          { hidden: true },
          { hidden: true },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { width: 20 },
          { hidden: true },
          { hidden: true },
        ];

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'export.xlsx');
      }
    });
  }
}
