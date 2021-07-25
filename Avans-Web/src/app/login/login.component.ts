import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.getAccessToken()) {
      this.router.navigate(['/admin-dashboard']);
      return;
    }
  }

  startAuthentication() {
    window.location.href = `${environment.api_base}/auth/avans?callback=${environment.callback}`;
  }
}
