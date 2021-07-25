import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from '../services/attempt.service';

@Component({
  selector: 'app-attempt-detail',
  templateUrl: './attempt-detail.component.html',
  styleUrls: ['./attempt-detail.component.css']
})
export class AttemptDetailComponent implements OnInit {

  private id : String;
  private attempt : any;

  constructor(private attemptService: AttemptService, private route : ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.attemptService.getAttempt(this.id).subscribe(data => {
      this.attempt = data;
    });
  }

}
