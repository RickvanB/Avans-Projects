import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EducationsService} from '../../services/educations.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-educations',
  templateUrl: './update-educations.component.html',
  styleUrls: ['./update-educations.component.scss']
})
export class UpdateEducationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  public currentedu = {id: 0, name: '', shortName: '', educationCode: '', maxEnrollmentsPerCompany: '', archived: ''};
  public currenteduId;

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
    private educationsService: EducationsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.currenteduId = parseInt(params.get('id'), 10);
        this.getEducations();
      }
    });
  }

  getEducations(): void {
    this.educationsService.getEducations().subscribe(data => {

      this.educations = new MatTableDataSource(data);
      this.educations.paginator = this.paginator;
      this.currentedu = data.find(element => element.id === this.currenteduId);

      this.educationFormGroup.patchValue(this.currentedu);
    });
  }

  onSubmit(value: any): void {
    console.log(value);
    this.currentedu.name = value.name;
    this.currentedu.shortName = value.shortName;
    this.currentedu.educationCode = value.educationCode;
    this.currentedu.maxEnrollmentsPerCompany = value.maxEnrollmentsPerCompany;
    this.currentedu.id = this.currenteduId;

    this.educationsService.updateEducation(this.currentedu).subscribe(data => {
      this.snackbar.open('Major is succesvol aangepast!', 'Notificatie verbergen', {
        duration: 5000,
      });

      this.getEducations();
    }, error => {
      let message;
      console.log(error);
      switch (error) {
        case 404:
          message = 'Opleiding niet gevonden';
          break;
      }

      this.snackbar.open(message, 'Notificatie verbergen', {
        duration: 5000,
      });
    });

    this.getEducations();
  }

}
