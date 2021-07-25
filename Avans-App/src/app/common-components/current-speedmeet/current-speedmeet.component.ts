import { Component, OnInit } from '@angular/core';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {Speedmeet} from '../../models/speedmeet';

@Component({
  selector: 'app-current-speedmeet',
  templateUrl: './current-speedmeet.component.html',
  styleUrls: ['./current-speedmeet.component.scss'],
})
export class CurrentSpeedmeetComponent implements OnInit {

  speedmeet: Speedmeet;
  error: any;

  constructor(
      private speedmeetService: SpeedmeetService
  ) { }

  ngOnInit() {
    this.speedmeetService.getLatestSpeedmeet().subscribe(
      speedmeet => {
        speedmeet.start = speedmeet.start.replace(' ', 'T');
        this.speedmeet = speedmeet;
      },
      error => this.error = error
    );

    this.speedmeetService.observeSpeedmeet().subscribe(speedmeet => this.speedmeet = speedmeet);
  }
}
