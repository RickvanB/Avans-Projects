import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  public UserName;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = jwt_decode(this.authService.getAccessToken());
    this.UserName = token.name;
  }

}
