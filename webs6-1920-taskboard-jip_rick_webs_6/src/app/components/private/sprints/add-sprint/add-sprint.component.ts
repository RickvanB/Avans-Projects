import { Component, OnInit } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { UserStory } from 'src/app/models/userStory';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { runInThisContext } from 'vm';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.scss']
})
export class AddSprintComponent implements OnInit {

  sprint : Sprint
  project: Project
  projects: Observable<Project[]>;
  status = [];
  validation = {
    name: null,
    status: null,
    general: null
  }
  availableStories : Observable<UserStory[]>;
  selectedStories : [];
  projectId;

  constructor(private AuthService : AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private sprintService : MainSprintService,
    private projectService : MainProjectService,
    private userStoryService : MainUserstoryService,
    private storeService : StoreService) { 
      this.sprint = {
        id: null,
        name: "",
        description: "",
        isActive: false,
        startDate: new Date(),
        endDate: new Date(),
        projectId: null,
        project: null
      }
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get("projectid")
    this.AuthService.getuser().subscribe(user => {
      this.projects = this.projectService.getProjectsOfUser(user.id);
      this.availableStories = this.userStoryService.getAvailableUserStories(null, this.projectId);
    });

    this.projectService.getProject(this.projectId).subscribe(project =>{
      this.project = project;
    });
  }

  submitSprint() : void {
    this.sprint.projectId = this.projectId;
    let results = this.sprintService.addSprint(this.sprint, this.selectedStories, this.project);

    if(results && results.length != 0) {
      results.forEach(result => {
        if(result == "name") {
          this.validation.name = "Naam dient tenminste 1 teken te bevatten";
        } else if (result == "description") {
          this.validation.general = "Schrijf een description voor de story";
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
          this.validation.general = "Het aanmaken van de story is mislukt";
        }
      })
    } else {
      this.backToProject();
    }
  };

  backToProject(){
    this.storeService.setValue(StoreKeys.Project_Id, this.projectId);
    this.router.navigate(['/project/details']);
  }
}
