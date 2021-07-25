import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../services/homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  htmlContent: any;

  constructor(private homepageService : HomepageService) { }

  ngOnInit() {
    this.getContent();
  }

  getContent() : void {
    this.homepageService.getHomepage().subscribe(data => {
      this.htmlContent = data;
    })
  }

}
