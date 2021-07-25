import { Component, OnInit } from '@angular/core';
import { PickerController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  template: `
  <ion-content class="auth">
  <div class="filler">
      <h4>Create Account</h4>
        <form (ngSubmit)="signUp()">
        <ion-item>
          <button class="username" type="button" expand="block" (click)="openPicker()">Pick Username</button>
        </ion-item>
        <ion-item>
          <ion-label>Password:</ion-label>
          <ion-input type="password" [(ngModel)]="user.password" name="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Repeat Password:</ion-label>
          <ion-input type="password"  [(ngModel)]="user.sec_password" name="sec_password"></ion-input>
        </ion-item>
        <div class="send">
          <button class="back sideButton" routerLink="/auth" type="submit" block>Back</button>
          <button class="signUp sideButton" type="submit" block>Sign Up</button>
        </div>
      </form>
    </div>
  </ion-content>  
  ` 
})
export class SignUpComponent implements OnInit {

  user = {
    username: "",
    password: "",
    sec_password: ""
  }

  defaultOptions = [
    [
      'Catcher',
      'Fast',
      'Epic',
      'Super',
      'Incredible',
      'Big'
    ],
    [
      'Ash',
      'Misty',
      'Brock',
      'Jessie',
      'James',
      'Meowth'
    ]
  ]

  constructor(private pickerController: PickerController, private toastController: ToastController, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {}

  signUp(){

    // Validate form
    if(this.user.username != "" && this.user.password == this.user.sec_password && this.user.password.length > 3){
      // Add new user
      this.authService.addPlayer(this.user.username, this.user.password).then(id => {
        this.router.navigate([`/`]);
      });
    } else if (this.user.password != this.user.sec_password && this.user.password.length > 3){
      this.showToast("Please make sure the passwords are the same")
    } else if (this.user.password.length <= 3 && this.user.username != ""){
      this.showToast("The password should have at least 4 characters")
    } else {
      this.showToast("Please pick a username & password")
    }
  }

  /**
   * Open multi-picker
   */
  async openPicker(){
    const picker = await this.pickerController.create({
      columns: this.getColumns(this.defaultOptions.length, this.defaultOptions[0].length, this.defaultOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.user.username = value.col_0.text + " " + value.col_1.text
          }
        }
      ]
    });

    await picker.present();
  }

  /**
   * Insert colums into the picker
   * @param numColumns 
   * @param numOptions 
   * @param columnOptions 
   */
  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col_${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  /**
   * Create options for the multi-picker
   * @param columnIndex 
   * @param numOptions 
   * @param columnOptions 
   */
  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
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
