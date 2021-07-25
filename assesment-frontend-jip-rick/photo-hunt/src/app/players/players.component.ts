import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  private players;

  constructor(private playerService : PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() : void {
    this.playerService.getPlayers().subscribe(data => {
      this.players = data;
    })
  }

}
