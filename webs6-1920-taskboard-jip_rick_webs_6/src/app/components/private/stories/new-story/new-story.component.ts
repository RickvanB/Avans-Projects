import { Component, OnInit } from '@angular/core';
import { UserStory } from 'src/app/models/userStory';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sub_services/sprint/sprint.service';
import { Observable } from 'rxjs';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent implements OnInit {

  story : UserStory
  projectId;
  status = [];
  validation = {
    name: null,
    status: null,
    general: null
  };
  sprints : Observable<Sprint[]>;

  constructor(private AuthService : AuthService,
    private router: Router,
    private storyService : MainUserstoryService,
    private sprintService : MainSprintService,
    private route: ActivatedRoute,
    private storeService: StoreService
    ) {

      this.story = {
        id: null,
        name: "",
        description: "",
        isArchived: false,
        owner: null,
        ownerId: null,
        sprint: null,
        sprintId: null,
        status: null,
        storyPoints: 0,
        taskOf: null,
        taskOfId: null
      }

     }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get("projectid")
    this.sprints = this.sprintService.subScribeOnSprints(this.projectId);
  }

  submitStory() : void {
    this.AuthService.user$.subscribe(user => {
      this.story.ownerId = user.id;
      let results = this.storyService.createNewUserStory(this.story, this.projectId);
      

      if(results){
        results.forEach(result => {
          if(result == "name") {
            this.validation.name = "Naam dient tenminste 1 teken te bevatten";
          } else if (result == "description") {
            this.validation.general = "Schrijf een description voor de story";
          } else if(result == "ownerId") {
            this.validation.name = "User story mist een eigenaar";
          } else {
            this.validation.general = "Het aanmaken van de story is mislukt";
          }
        })
      } else {
        this.storeService.setValue(StoreKeys.Project_Id, this.projectId)
        this.router.navigate(['/project/details'])
      }
    })
  }

  goback(){
    this.storeService.setValue(StoreKeys.Project_Id, this.projectId)
    this.router.navigate(['/project/details'])
  }
}
