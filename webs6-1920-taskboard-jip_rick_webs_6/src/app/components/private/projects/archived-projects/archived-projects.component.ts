import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';

@Component({
  selector: 'app-archived-projects',
  templateUrl: './archived-projects.component.html',
  styleUrls: ['./archived-projects.component.scss']
})
export class ArchivedProjectsComponent implements OnInit {

  myProjects: Project[];

  constructor(private projectService: MainProjectService, private authService: AuthService,
    private userService: MainUserService) { }

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
    this.projectService.getProjectsOfUser(identifier).subscribe(projects => {
      this.myProjects = [];
      projects.forEach(project => {
        if(project.isArchived){
          this.myProjects.push(project);
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
   * De-archive project
   * @param identifier 
   */
  deArchive(project: Project){
    if(project){
      project.isArchived = false;
      this.projectService.updateProject(project)
    }
  }
}
