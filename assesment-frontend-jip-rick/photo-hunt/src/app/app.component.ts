import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'photo-hunt';

  constructor(private websocketService : WebsocketService, private notifierService : NotifierService) { }

  ngOnInit(): void {

    if (this.websocketService.socket == null) {
      this.websocketService.initSocket();
    }
    
  }

}
