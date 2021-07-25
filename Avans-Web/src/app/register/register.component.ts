import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerFormGroup = new FormGroup({
    parent_company: new FormControl(),
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    website: new FormControl(''),
    emailaddress: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    logo_path: new FormControl(),
    address: new FormControl('', [
      Validators.required
    ]),
    zipcode: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    country: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(value: any): void {
    this.registerService.addCompany(value).subscribe(data => {
      this.snackBar.open('Account is succesvol aangemaakt!', 'Notificatie verbergen', {
        duration: 5000,
      });
    }, error => {
      this.snackBar.open(error.status + ': ' + error.statusText, 'Notificatie verbergen', {
        duration: 5000,
      });
    });
  }
}
