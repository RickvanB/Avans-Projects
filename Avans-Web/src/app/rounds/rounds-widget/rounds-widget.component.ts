import { Component, OnInit } from '@angular/core';
import {SpeedmeetService} from '../../services/speedmeet.service';

@Component({
  selector: 'app-rounds-widget',
  templateUrl: './rounds-widget.component.html',
  styleUrls: ['./rounds-widget.component.scss']
})
export class RoundsWidgetComponent implements OnInit {

  rounds: [{
    id: number,
    timestart: string,
    timeend: string
  }];

  constructor(
    private speedmeetService: SpeedmeetService
  ) { }

  ngOnInit(): void {
    this.speedmeetService.getRounds().subscribe(rounds => this.rounds = rounds);
  }
}
