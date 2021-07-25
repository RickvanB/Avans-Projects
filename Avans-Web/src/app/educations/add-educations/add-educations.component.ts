import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EducationsService } from '../../services/educations.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-educations',
  templateUrl: './add-educations.component.html',
  styleUrls: ['./add-educations.component.scss']
})

export class AddEducationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('f') myNgForm;

  panelOpenState = false;
  public educations: MatTableDataSource<any>;
  columnsToDisplay: string[] = ['Major'];

  educationFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    shortName: new FormControl('', [
      Validators.required
    ]),
    educationCode: new FormControl('', [
      Validators.required
    ]),
    maxEnrollmentsPerCompany: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private snackbar: MatSnackBar,
    private educationsService: EducationsService
  ) { }

  ngOnInit(): void {
    this.getEducations();
  }

  getEducations(): void {
    this.educationsService.getEducations().subscribe(data => {
      this.educations = new  MatTableDataSource(data);
      this.educations.paginator = this.paginator;
    });
  }

  onSubmit(value: any): void {
    value.archived = false;

    console.log(value);

    this.educationsService.addEducation(value).subscribe(data => {

      this.snackbar.open('Major is succesvol aangemaakt!', 'Notificatie verbergen', {
        duration: 5000,
      });

      this.myNgForm.resetForm();

      this.getEducations();
    }, error => {
      this.snackbar.open(error.status + ': ' + error.statusText, 'Notificatie verbergen', {
        duration: 5000,
      });
    });
  }

}
