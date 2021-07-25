import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCompanyService } from '../services/login-company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.scss']
})
export class LoginCompanyComponent implements OnInit {

  loginFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private snackbar: MatSnackBar,
    private loginCompanyService: LoginCompanyService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkRedirect();
  }

  checkRedirect() {
    if (this.authService.getAccessToken()) {
      this.router.navigate(['/company-dashboard']);
      return;
    }
  }

  onSubmit(value: any): void {
    console.log(value);
    this.loginCompanyService.login(value.email, value.password).subscribe(data => {
      if (data.access_token) {
        this.authService.setAccessToken(data.access_token);
        this.checkRedirect();
      } else {
        this.snackbar.open(data.message, 'Notificatie verbergen', {
          duration: 5000,
        });
      }
    }, error => {
      console.log(error);
      this.snackbar.open(error.error.status + ': ' + error.error.message, 'Notificatie verbergen', {
        duration: 5000,
      });
    });
  }
}
