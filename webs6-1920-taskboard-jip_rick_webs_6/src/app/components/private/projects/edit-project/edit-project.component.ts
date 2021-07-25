import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { Status } from 'src/app/enums/status';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  project: Project;
  status = [];
  validation =
  {
    name: null,
    status: null,
    general: null
  }


  constructor(
    private projectService: MainProjectService,
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router
    ) 
    {
      for (let item in Status) {
        this.status.push(Status[item])
      }
    }

  ngOnInit(): void {
    var project = this.storeService.getValue(StoreKeys.Project_Edit)

    // Check if project is present
    if(project){
      this.project = project;
      // Remove project
      this.storeService.removeValue(StoreKeys.Project_Edit)
    } else {
      this.router.navigate(['/'])
    }
  }

    /**
   * This method will be fired when the status of the projects gets changed
   * @param deviceValue 
   */
  onSelectStatus(statusValue) {
    this.project.status = statusValue;
  }

  /**
   * Validate project and update project
   */
  submitProject(){
    this.authService.user$.subscribe(user => {
      var results = this.projectService.updateProject(this.project);
  
      if(results){
        results.forEach(result => {
          if(result == "name"){
            this.validation.name = "Naam dient tenminste 1 teken te bevatten"
          } else if(result == "status"){
            this.validation.status = "Kies een status voor het project"
          } else {
            this.validation.general = "Het aanmaken van het project is mislukt"
          }
        })
      } else {
        this.router.navigate(['/projects'])
      }
    })
  }
}
