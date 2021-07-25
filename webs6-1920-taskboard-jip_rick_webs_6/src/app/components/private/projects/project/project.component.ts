import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { Observable } from 'rxjs';
import { UserStory } from 'src/app/models/userStory';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input()
  project: Project;
  userstories : Observable<UserStory[]>;
  showAsTable: boolean;
  sprints : Sprint[];

  constructor(private router: Router, 
    private projectService: MainProjectService, 
    private storeService: StoreService,
    private storyService : MainUserstoryService) {
  }

  ngOnInit(): void {
    var project_id = this.storeService.getValue(StoreKeys.Project_Id)

    if(!project_id){
      this.router.navigate(['/'])
    } else {
      this.projectService.getProject(project_id).subscribe(project => {
        this.project = project;
        this.userstories = this.storyService.subscribeOnUserStories(project.id, null);
        this.sprints = project.sprints;
      })
    }
  }

  /**
   * Change the way of displaying the data
   */
  changeView() {
    this.showAsTable = !this.showAsTable;
  }

  deArchive(story : UserStory) {
    story.isArchived = false;
    let result = this.storyService.updateUserStory(story, this.project.id);

    if(result != null) {
      alert("Er is iets misgegaan, probeer het later opnieuw!");
    }
  }

}
