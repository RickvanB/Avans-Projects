import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core'
import { Player } from '../models/storage_models'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  private USERS_KEY = "USERS"
  private CURRENT_KEY = "CURRENT"
  private SIGNED_IN = false;
  private USER_ID;

  constructor(private router: Router, private toastController: ToastController) { 
    // Check if user was signed in
    Storage.get({key: this.CURRENT_KEY}).then(result => {
      if(result != null && result.value != null){
        this.isUser(result.value).then(isUser =>{
          if(isUser){
            this.USER_ID = result.value;
            this.SIGNED_IN = true;
          }
        })
      }
    })
  }

  /**
   * Add new user to the storage
   * @param username 
   * @param password 
   */
  addPlayer(username: string, password: string) : Promise<number>{

    return Storage.get({key: this.USERS_KEY}).then(data => {
      var users: Player[];

      if(data != null){
        try{
          users = JSON.parse(data.value);
        } catch{
          users = [];
        }
      }

      if(users == null){
        users = [];
      }

      return this.getNextId().then(id => {
        // Create user
        users.push({
          id: id,
          name: username,
          password: password,
          pokemonCatches: []
        })

        // Save user
        Storage.set({key: this.USERS_KEY, value: JSON.stringify(users)}).catch(err => {
          this.showToast("Adding Player has failed. Clear your Storage on the admin page")
        })

        return this.signIn(username, password).then(() =>{
          return id
        })
      })
    })
  }

  /**
   * Sign a player in
   * @param username 
   * @param password 
   */
  signIn(username: string, password: string) : Promise<boolean>{
    return Storage.get({key: this.USERS_KEY}).then(users => {
      if(users != null){
        var userList: Player[];
        try{
          userList = JSON.parse(users.value);
        } catch{
          userList = [];
        }

        if(userList == null){
          return false;
        }

        for(var i = 0; i < userList.length; i++){
          if(userList[i].name == username){
            if(userList[i].password == password){
              this.USER_ID = userList[i].id
              this.SIGNED_IN = true

              // Save current user Id
              Storage.set({key: this.CURRENT_KEY, value: userList[i].id.toString()}).catch(err => {
                this.showToast("Signin in has failed. Clear your Storage on the admin page")
              })

              return true;
            }
          }
        }
      }

      return false;
    });
  }

  /**
   * Sign out the current user
   */
  signOut(){
    this.SIGNED_IN = false;
    this.USER_ID = null;

    // Remove current user id from storage
    Storage.set({key: this.CURRENT_KEY, value: null})
    .catch(err => {
      this.showToast("Signing out has failed. Clear your Storage on the admin page")
    })
  }

  /**
   * Check if a user exists
   * @param id 
   */
  isUser(id) : Promise<boolean>{
    return Storage.get({key: this.USERS_KEY}).then(result =>{
      if(result != null){
        if(result.value != null){
          try{
            var users: Player[] = JSON.parse(result.value);

            if(users != null){
              for(var i = 0; i < users.length; i++){
                if(users[i].id == id){
                    return true;
                }
              }
            }        
            return false;
          } catch{
            return false;   
          }
        }
      }
    })
  }

  /**
   * Return credentials if signed in
   */
  getCredentials(): number{
    if(this.SIGNED_IN){
      return this.USER_ID;
    }

    return null;
  }

  /**
   * Return if a user is sign in
   */
  private isAuthenticated(): boolean{
    return this.SIGNED_IN;
  }

  /**
   * This method will get the next free id
   */
  getNextId() : Promise<number>{
    return Storage.get({key: this.USERS_KEY}).then(users => {
      var highest = 0;

      if(users != null){
        var userList: Player[];
        
        try{
          userList = JSON.parse(users.value);
        } catch{
          userList = [];
        }

        // If there are no catches yet return base position
        if(userList == null){
          return highest;
        }
        // Search highest postion
        for(var i = 0; i < userList.length; i++){
          if(userList[i].id > highest){
            highest = userList[i].id;
          }
        }

        return highest + 1;
        
      } else{
         return highest
      }
    })
  }

  /**
   * Check if user has access to the route
   * @param route 
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    let authInfo = {
      authenticated: this.isAuthenticated()
    };

    if (!authInfo.authenticated) {
      this.router.navigate(["auth"]);
      return false;
    }

    return true;
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
