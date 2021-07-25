import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  template: `
  <ion-content class="auth">
    <div class="filler">
      <h4>Sign In</h4>
      <form (ngSubmit)="signIn()">
        <ion-item>
          <ion-label>Username:</ion-label>
          <ion-input type="text" [(ngModel)]="user.username" name="username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password:</ion-label>
          <ion-input type="password"  [(ngModel)]="user.password" name="password"></ion-input>
        </ion-item>
        <div class="send">
          <button class="back sideButton" routerLink="/auth" type="submit" block>Back</button>
          <button class="signUp sideButton" type="submit" block>Sign In</button>
        </div>
      </form>
    </div>
  </ion-content>  
  ` 
})
export class SignInComponent implements OnInit {

  user = {
    username: "",
    password: "",
  }

  constructor(private toastController: ToastController, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {}

  signIn(){
    if(this.user.username != "" && this.user.password != ""){

      // Try signin in
      this.authService.signIn(this.user.username, this.user.password).then(succes => {
        if(succes != null){
          if(succes){
            // Succesfull signed in
            this.router.navigate([`/`]);
          } else{
            // Not succesfull
            this.showToast("Password or/and Username is incorrect")
          }
        }
      })
    } else{
      this.showToast("Please make sure both fields are filled")
    }
  }

      /**
   * This message will display a toast
   * @param message 
   */
  private showToast(message){
    this.toastController.create({
      message: message,
      duration: 2000
    }).then( toast => {
      toast.present();
    });
  }
}
