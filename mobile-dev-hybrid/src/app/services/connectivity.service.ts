import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  private connection = false;

  constructor(private network: Network, private platform: Platform) {
    this.platform.ready().then(()=>{
      this.subscribeOnConnection();
    })
   }

  isOnline() : boolean {
    return this.connection;
  }

  /**
   * This method will check wether the connection got disconected or established
   */
  subscribeOnConnection(){
    // Native check for connection
    let curConnection = this.network.type;

    // If null then it is not a mobile device but a browser
    if(curConnection != null){
      if(curConnection !== 'unknown' && curConnection !== 'none'){
        this.connection = true;
      }
      // Subscribe on when connection got disconected
      this.network.onDisconnect().subscribe(() => {
        this.connection = false;
      });

      // Subscribe on when connection got established
      this.network.onConnect().subscribe(() => {
        this.connection = true;
      });

    } else{
      // Web check for connection
      if(navigator.onLine){
        this.connection = true;
      }

      window.addEventListener('offline', () =>{
        this.connection = false;
      });

      window.addEventListener('online', () =>{
        this.connection = true;
      });
    }
  }
}