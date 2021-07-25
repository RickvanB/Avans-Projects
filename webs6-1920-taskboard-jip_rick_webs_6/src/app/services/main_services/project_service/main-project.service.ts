import { Injectable } from '@angular/core';
import { ProjectService } from '../../sub_services/project/project.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/models/project';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from '../../sub_services/sprint/sprint.service';
import { Projectvalidator } from 'src/app/validators/projectValidator';
import { map, filter } from 'rxjs/operators';
import { MainUserService } from '../user_service/main-user.service';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/models/user';
import { MainSprintService } from '../sprint_service/main-sprint.service';

@Injectable({
  providedIn: 'root'
})
export class MainProjectService {

  private validator: Projectvalidator = new Projectvalidator();
  private projects : Observable<Project[]>;

  constructor(private projectService: ProjectService,
    private userSerivce: MainUserService) { }

  /**
   * This method will subscribe on a list of all projects
   */
  subScribeOnProjects(): Observable<Project[]>{
    this.projects = this.projectService.projects.asObservable();
    return this.projects;
  }

  /**
   * This method will add a new project to the firebase
   * @param project 
   */
  addProject(project: Project) : string[]{
    // Validate project
    var result = this.validator.validateProject(project);
    if(!result) {
      this.projectService.addProject(project).then(succes => {
        if(!succes){
          return ["Failed"];
        }
        return null;
      });
    } else {
      return result;
    }
  }

  /**
   * This method will update an existing project in firebase
   * @param project 
   */
  updateProject(project: Project) : string[]{
    // Validate project
    var result = this.validator.validateProject(project);
    if(!result) {
      this.projectService.updateProject(project).then(succes => {
        if(!succes){
          return ["Failed"];
        }
        return null;
      });
    } else {
      return result;
    }
  }

  /**
   * This method will get a specified project
   * @param identifier 
   */
  getProject(identifier) : Observable<Project> {
    return this.projectService.getProject(identifier);
  }


  /**
   * Get all project of a user
   * @param identifier 
   */
  getProjectsOfUser(identifier) {
    return this.subScribeOnProjects()
    .pipe(
      map(items => items.filter(item => item.ownerId === identifier)),
      filter(projects => projects && projects.length > 0)
    );
  }

  /**
   * This method will add a user to a project as participant
   * @param projectIdentefier 
   * @param userIdentefier 
   */
  addParticipant(project: Project, user: User, particpants: any[]){
    if(project && user){
      this.userSerivce.addUserAsParticipant(project.id, user, particpants);
    }
  }

  /**
   * This method will update an existing participant
   * @param project 
   * @param user 
   */
  updateParticipant(project: Project, user: User, participants: any[]){
    if(project && user){
      this.userSerivce.updateParticipant(project.id, user, participants)
    }
  }

  /**
   * This method will remove a user from participating on a project
   * @param project
   * @param user 
   */
  removeParticipant(project: Project, participantId: string, participants: any[]){
    if(project && participantId){
      this.userSerivce.removeUserAsParticipant(project.id, participantId, participants);
    }
  }

}