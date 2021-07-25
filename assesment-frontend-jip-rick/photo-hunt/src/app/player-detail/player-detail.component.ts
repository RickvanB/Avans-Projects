import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { TargetService } from '../services/target.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  private player;
  private targets;
  private attempts;

  constructor(private playerService : PlayerService, private route : ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id
    this.getPlayer(id);
    this.getTargetsFromPlayer(id);
    this.getAttemptsFromPlayer(id);
  }

  getPlayer(player_id : string) : void {
    this.playerService.getPlayer(player_id).subscribe(data => {
      this.player = data;
    })
  }

  getTargetsFromPlayer(player_id) : void {
    this.playerService.getTargetsFromUser(player_id).subscribe(data => {
      this.targets = data;
    })
  }

  getAttemptsFromPlayer(player_id) : void {
    this.playerService.getAttemptsFromUser(player_id).subscribe(data => {
      this.attempts = data;
    })
  }
}
