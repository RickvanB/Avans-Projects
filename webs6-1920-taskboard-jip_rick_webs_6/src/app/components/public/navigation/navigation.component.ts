import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user : User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getuser().subscribe(user => {
      this.user = user;
    })
  }

  /**
   * Sign user in
   */
  signIn(){
    this.authService.googleSignin().then( user => {
      
    })
  }

  /**
   * Sign user out
   */
  signOut(){
    this.authService.signOut().then(() =>{
    });
  }

}
