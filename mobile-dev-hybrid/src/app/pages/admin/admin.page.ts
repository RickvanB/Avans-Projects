import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController, Events } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  loading = false;

  constructor(private storageService: StorageService, private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
  }

  resetPlacedPokemons(useCurLocation: boolean) {
    this.loading = true
    this.storageService.clearStorage(useCurLocation).then( () => {
      // Map needs to be updated
      this.showToast("Pokemons have been removed and replaced!")
      this.loading = false
    })
  }

  clearStorage(){
    this.loading = true
    this.storageService.clearStorage(false, true).then( () => {
      this.authService.signOut();
      // Map needs to be updated
      this.showToast("Storage has been cleared")
      this.loading = false
    })
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
