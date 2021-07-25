import { Component, OnInit } from '@angular/core';
import { Target } from 'src/models/Target';
import { TargetService } from '../services/target.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { WebsocketService } from '../services/websocket.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent implements OnInit {

  targets: Target[];
  targetsNearBy: Target[];
  cur_user_id: string; 
  currentUser : any;
  page : any;
  photos : any;
  notifier: NotifierService;

  rangeForm = new FormGroup({
    range: new FormControl(''),
    long: new FormControl(''),
    lat: new FormControl(''),
  });

  constructor(private targetService: TargetService, 
    private authSerice: AuthService, 
    private route : ActivatedRoute, 
    private playerService : PlayerService,
    private socketService : WebsocketService,
    private notifierService : NotifierService,
    private router : Router) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.getCurrentUser();
    this.route.queryParams.subscribe(x => this.getTargets(x.page || 1, x.sort));
    this.playerService.getPlayer(this.cur_user_id).subscribe(user => {
      this.currentUser = user;
    });

    let data = sessionStorage.getItem('subscribe-rooms');
    if (data === null) {
      this.socketService.send("subscribe", {room: "photo_hunt" });
      this.socketService.send("new-upload", { room: "new-upload" });

      this.socketService.onMessage("subscribed").subscribe(data => {
        this.notifier.notify("success", data.message);
      });

      sessionStorage.setItem('subscribe-rooms', 'true'); 
    }

    this.socketService.onMessage("new-upload").subscribe(data => {
      this.notifierService.notify("info", data.message);
    });
  }

  deleteTarget(id: string): void {
    this.targetService.removeTarget(id).subscribe(result => {
      this.getTargets(null, null);
    })
  }

  getCurrentUser(): void {
    this.authSerice.user.subscribe(user => {
      this.cur_user_id = user.id;
      // Get the targets after getting user
      this.getTargets(null, null);
    });
  }

  getTargets(page: number, sort: any): void {
    this.page = page;
    this.targetService.getTargts(10, this.page, sort)
    .subscribe(pagination => {
      this.targets = pagination.docs
    });
  }

  targetsWithinRange(): void{
    this.targetService.getTargetsWithinRang(this.rangeForm.value.range,this.rangeForm.value.lat, this.rangeForm.value.long)
    .subscribe(targets =>
      this.targetsNearBy = targets
      );
  }

  addReviewToTarget(isTumbsUp: boolean, target_id: string) {
    this.targetService.addNewReview(isTumbsUp, target_id).subscribe(result => {
      this.socketService.send("message", { newReview: true, result: result });
    });

    this.socketService.onMessage("message").subscribe(data => {
      if(data.update) { 
        this.ngOnInit();
      }
    });
  }

  getTargetWithHighestScore() : void {
    this.router.navigate(['/targets'], { queryParams: { sort: 'highest-score' } });
    this.ngOnInit()
  }

  getTargetWithLowestScore() : void {
    this.router.navigate(['/targets'], { queryParams: { sort: 'lowest-score' } });
    this.ngOnInit();
  }
}
