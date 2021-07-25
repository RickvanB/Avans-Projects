import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Status } from '../../../../enums/status'
import { Key } from 'protractor';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  project: Project
  status = [];
  validation =
  {
    name: null,
    status: null,
    general: null
  }

  constructor(private projectService: MainProjectService, private authService: AuthService, private router: Router) {
    for (let item in Status) {
      this.status.push(Status[item])
    }
      
    this.project = {
      id: null,
      description: "",
      isArchived: false,
      name: "",
      owner: null,
      ownerId: null,
      participants: [],
      status: Status.Inisiation_Phase
    }
  }

  ngOnInit(): void {
  }

  /**
   * This method will be fired when the status of the projects gets changed
   * @param deviceValue 
   */
  onSelectStatus( statusValue) {
    this.project.status = statusValue;
  }

  /**
   * Validate project and submit new project
   */
  submitProject(){
    this.authService.user$.subscribe(user => {
      this.project.ownerId = user.id
      var results = this.projectService.addProject(this.project);
    
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
