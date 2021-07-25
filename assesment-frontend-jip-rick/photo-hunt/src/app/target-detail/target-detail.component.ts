import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TargetService } from '../services/target.service';
import { Target } from 'src/models/Target';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.css']
})
export class TargetDetailComponent implements OnInit {

  private id : String
  private target : Target
  private attempts : any
  private photos : any[];
  photo_attempts : any[];

  constructor(private targetService: TargetService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.photos = [];
    this.targetService.getTarget(this.id).subscribe(data => {
      this.target = data;
    });
    
    this.targetService.getAttemptsForTarget(this.id).subscribe(data => {
      this.attempts = data;
      for (let index = 0; index < this.attempts.length; index++) {
        this.targetService.getPhotosFromAttemptsTarget(this.id, this.attempts[index]._id).subscribe(photo => {
          this.photos.push(photo);
        });
      }
    });
  }

}
