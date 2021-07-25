import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  signInHtml: string
  signedIn: boolean
  username: string
  private apiUrl : string

  constructor(private authService: AuthService) {}
 
  ngOnInit() {
    this.apiUrl = environment.api_url;
    this.authService.checkToken();
    this.authService.user.subscribe(u => {
        if(u == null){
          this.signedIn = false;
          this.username = null;
        } else {
          this.signedIn = true;
          this.username = u.name;
        }
    })
  }

  signOut(): void {
    this.authService.singOut();
  }
}
