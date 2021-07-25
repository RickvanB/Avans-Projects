import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  myProjects: Project[]
  project: Project;
  showAsTable: boolean;

  constructor(private projectService: MainProjectService, private authService: AuthService,
    private userService: MainUserService, private router: Router, private storeService: StoreService) { }

  ngOnInit(): void {
    this.authService.getuser().subscribe(user => {
      if(user != null){
        this.getProjects(user.id);
      } 
    })
  }

  /**
   * This method will subscribe on the list of project of the current user
   * @param identifier 
   */
  getProjects(identifier){
    this.projectService.subScribeOnProjects().subscribe(projects => {
      this.myProjects = [];
      projects.forEach(project => {
        if(project.ownerId == identifier){
          this.myProjects.push(project);
        } else {
          project.participants.forEach(participant => {
            if(participant.userId == identifier && !project.isArchived){
              this.myProjects.push(project);
            }
          })
        }
      })
      
      // Get owners
      this.myProjects.forEach(project => {
        this.userService.getUser(project.ownerId).subscribe(user =>{
          project.owner = user;
        })
      })
    })
  }

  /**
   * This method will get the details of a project
   * @param identifier 
   */
  getDetails(identifier){
    if(identifier){
      this.myProjects.forEach(project => {
        if(project.id == identifier){
          this.project = project;
        }
      });
    }
  }
  
  /**
   * Change the way of displaying the data
   */
  changeView(){
    this.showAsTable = !this.showAsTable;
  }

  /**
   * Navigate to edit component
   */
  navigateToProject(identifier, name){
    this.storeService.setValue(StoreKeys.Project_Id, identifier)
    this.router.navigate([`${name}/details`]);
  }

}
