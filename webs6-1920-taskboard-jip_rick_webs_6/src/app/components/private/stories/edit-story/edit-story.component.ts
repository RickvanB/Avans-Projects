import { Component, OnInit } from '@angular/core';
import { UserStory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { Router, ActivatedRoute } from '@angular/router';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { SprintService } from 'src/app/services/sub_services/sprint/sprint.service';
import { User } from 'src/app/models/user';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {

  story : UserStory
  projectId;
  status = [];
  validation = {
    name: null,
    status: null,
    general: null
  };
  sprints : Observable<Sprint[]>;
  users : Observable<User[]>;

  constructor(
    private router: Router,
    private storyService : MainUserstoryService,
    private sprintService : MainSprintService,
    private userService : MainUserService,
    private storeService : StoreService,
    private authService : AuthService,
    private route: ActivatedRoute,
    private location : Location) { 
      
    let story = this.storeService.getValue(StoreKeys.Project_Edit);
    this.projectId = this.route.snapshot.paramMap.get("projectid")

    //Check if story is present
    if(story) {
      this.story = {
        id: story.id,
        name: story.name,
        description: story.description,
        isArchived: story.isArchived,
        owner: story.owner,
        ownerId: story.ownerId,
        sprint: null,
        sprintId: story.sprintId,
        status: null,
        storyPoints: story.storyPoints,
        taskOf: null,
        taskOfId: null
      };

      // Remove story
      this.storeService.removeValue(StoreKeys.Story_Edit);
    } else {
      this.router.navigate(['/']);
    }
    
    this.sprints = this.sprintService.subScribeOnSprints(this.projectId);
    this.users = this.userService.subScribeOnUsers();
  }

  ngOnInit(): void {
  }

  submitStory() {
    this.authService.user$.subscribe(user => {
      this.story.movedToDone = null;
      let results = this.storyService.updateUserStory(this.story, this.projectId);
      if(this.story.sprintId != null || this.story.sprintId != "") {
        this.storyService.addToSprint(this.projectId, this.story.sprintId, this.story);
      }
  
      if(results){
        results.forEach(result => {
          if(result == "name") {
            this.validation.name = "Naam dient tenminste 1 teken te bevatten";
          } else if (result == "description") {
            this.validation.general = "Schrijf een description voor de story";
          } else if(result == "ownerId") {
            this.validation.name = "User story mist een eigenaar";
          }else {
            this.validation.general = "Het aanmaken van de story is mislukt";
          }
        })
      } else {
        this.location.back();
      } 
    })
  }

}
