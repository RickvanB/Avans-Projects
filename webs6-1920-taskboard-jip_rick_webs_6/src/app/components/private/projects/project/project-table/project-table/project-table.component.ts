import { Component, OnInit, Input } from '@angular/core';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { UserStory } from 'src/app/models/userStory';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {

  @Input() sprints;
  @Input() userstories;

  constructor(private storySerivce: MainUserstoryService) { }

  ngOnInit(): void {
  }


  deArchive(story : UserStory) {
    if(this.sprints){
      if(this.sprints[0]){
        story.isArchived = false;
        let result = this.storySerivce.updateUserStory(story, this.sprints[0].projectId);
    
        if(result != null) {
          alert("Er is iets misgegaan, probeer het later opnieuw!");
        }
      } 
    }
  }

}
