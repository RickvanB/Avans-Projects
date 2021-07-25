import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EducationsService } from '../../services/educations.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-overview-educations',
  templateUrl: './overview-educations.component.html',
  styleUrls: ['./overview-educations.component.scss']
})
export class OverviewEducationsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public educations: MatTableDataSource<any>;
  columnsToDisplay: string[] = ['Major', 'Afkorting', 'Opleiding', 'Max inschrijvingen', 'Slider', 'Actions'];

  constructor(
    private educationsService: EducationsService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.getEducations();
  }

  getEducations(): void {
    this.educationsService.getEducations().subscribe(data => {
      this.educations = new MatTableDataSource(data);
      this.educations.paginator = this.paginator;
      this.educations.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.educations.filter = filterValue;
  }

  sliderChange(element) {
    if (element.archived) {
      element.archived = false;
    } else {
      element.archived = true;
    }
    this.educationsService.updateEducation(element).subscribe(data => {
      this.snackbar.open(data.message, 'Notificatie verbergen', {
        duration: 5000,
      });
      this.getEducations();
    });
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Weet je het zeker?',
        message: 'Weet je zeker dat je onderstaande opleiding wilt verwijderen? Dit zal alle studenten uitschrijven',
        extra: element.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.educationsService.deleteEducation(element.id).subscribe((data) => {
          this.getEducations();
          this.snackbar.open(data.message, 'Notificatie verbergen', {
            duration: 5000,
          });
        });
      }
    });
  }
}
