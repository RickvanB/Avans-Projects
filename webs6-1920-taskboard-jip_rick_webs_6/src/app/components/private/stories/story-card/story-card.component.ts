import { Component, OnInit, Input } from '@angular/core';
import { UserStory } from 'src/app/models/userStory';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { Router } from '@angular/router';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent implements OnInit {

  @Input() data : UserStory;
  @Input() projectId : string;
  @Input() minimalize : boolean;

  constructor(private userService : MainUserService,
    private storeService : StoreService,
    private router : Router,
    private userStoryService : MainUserstoryService) { }

  ngOnInit(): void {
    this.getUserFromId();
  }

  getUserFromId() {
    this.userService.getUser(this.data.ownerId).subscribe(user => {
      this.data.owner = user;
    })
  }

  goToEdit(story : UserStory) {
    this.storeService.setValue(StoreKeys.Project_Edit, story);
    this.router.navigate([`userstory/${story.name}/edit/${this.projectId}`]);
  }

  archive(story : UserStory) {
    story.isArchived = true;
    let result = this.userStoryService.updateUserStory(story, this.projectId);

    if(result != null) {
      alert("Er is iets misgegaan, probeer het later opnieuw!");
    }
  }

  dearchive(story : UserStory){
    story.isArchived = false;
    let result = this.userStoryService.updateUserStory(story, this.projectId);

    if(result != null) {
      alert("Er is iets misgegaan, probeer het later opnieuw!");
    }
  }

}
