import { Component, OnInit } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { UserStory } from 'src/app/models/userStory';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.scss']
})
export class EditSprintComponent implements OnInit {

  sprint : Sprint;
  projectId;
  status = [];
  validation = {
    name: null,
    status: null,
    general: null
  };
  projects : Observable<Project[]>;
  project : Project
  relatedStories : Observable<UserStory[]>;
  availableStories : Observable<UserStory[]>;
  selectedStories: [];

  constructor(private router: Router,
    private sprintService : MainSprintService,
    private userStoryService : MainUserstoryService,
    private storeService : StoreService,
    private projectService : MainProjectService,
    private route: ActivatedRoute,
    private location : Location) 
    {
      this.sprint = this.storeService.getValue(StoreKeys.Sprint_Edit);
      this.projectId = this.route.snapshot.paramMap.get("projectid")

      this.storeService.removeValue(StoreKeys.Sprint_Edit);
      if(!this.sprint) {
        this.router.navigate(['/']);
      }
      this.projects = this.projectService.subScribeOnProjects();
      this.relatedStories = this.userStoryService.getAvailableUserStories(this.sprint.id, this.sprint.projectId)
      this.availableStories = this.userStoryService.getAvailableUserStories(null, this.sprint.projectId)
    }

  ngOnInit(): void {
    this.projectService.getProject(this.sprint.projectId).subscribe(result => { return this.project = result; });
  }

  submitSprint() {
    let results = this.sprintService.updateSprint(this.sprint, this.selectedStories, this.project, this.sprint.projectId);

    if(results) {
      results.forEach(result => {
        if(result == "name") {
          this.validation.name = "Naam dient tenminste 1 teken te bevatten";
        } else if (result == "description") {
          this.validation.general = "Schrijf een description voor de sprint";
        } else if (result == "startDate") {
          this.validation.name = "Sprint mist een startdatum";
        } else if (result == "endDate") {
          this.validation.name = "Sprint mist een einddatum";
        } else if (result == "invalid_startdate") {
          this.validation.general = "De startdatum kan niet voorbij de einddatum zijn";
        } else if (result == "projectId") {
          this.validation.name = "Sprint mist een project";
        } else if (result == "active") {
          this.validation.general = "Er kunnen niet meerdere sprints actief zijn";
        } else {
          this.validation.general = "Het aanmaken van de sprint is mislukt";
        }
      })
    } else {
      this.location.back();
    }
  }

  removeUserStory(story : UserStory) {
    story.sprintId = "";
    this.userStoryService.removeFromSprint(this.sprint.projectId, this.sprint.id, story);
  }

}
