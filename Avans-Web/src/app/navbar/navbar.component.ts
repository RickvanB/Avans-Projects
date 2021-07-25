import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  public isAdmin;
  public isCompany;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        this.updateMenuStatus();
      }

    });
  }

  ngOnInit(): void {
    this.updateMenuStatus();
  }

  logout() {
    this.authService.removeAccessToken();
    this.router.navigate(['/login']);
  }

  updateMenuStatus() {
    if (this.authService.getAccessToken()) {
      const user = jwt_decode(this.authService.getAccessToken());
      if (user.type === 2) {
        this.isAdmin = true;
        this.isCompany = false;
      } else if (user.type === 1) {
        this.isCompany = true;
        this.isAdmin = false;
      } else {
        this.isCompany = false;
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
      this.isCompany = false;
    }

  }
}
