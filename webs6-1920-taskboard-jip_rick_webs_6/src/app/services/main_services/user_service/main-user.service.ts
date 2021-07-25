import { Injectable } from '@angular/core';
import { UserService } from '../../sub_services/users/user.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class MainUserService {

  constructor(private userService: UserService) { }

  /**
   * This method will subscribe on a list of all users
   */
  subScribeOnUsers(): Observable<User[]>{
    return this.userService.users.asObservable();
  }

  /**
   * This method will get a specified user
   * @param identifier 
   */
  getUser(identifier): Observable<User> {
    return this.subScribeOnUsers().pipe(         
      map
      (
        users => users.find(user => user.id === identifier))     
      );
  }

  /**
   * Get an user by email adress
   * @param email 
   */
  getUserByEmail(email): Observable<User>{
    return this.subScribeOnUsers().pipe(         
      map
      (
        users => users.find(user => user.email === email))     
      );
  }

  /**
   * Get all member of a project
   * @param projectId 
   */
  getTeam(project: Project){
    if(!project){
      return;
    }

    project.participants.forEach(participant =>{
      this.getUser(participant.userId)
    })
  }

  addUserAsParticipant(projectId, user: User, participants: any[]){
    this.userService.addUserAsParticipant(projectId, user, participants);
  }

  updateParticipant(projectId,user: User, participants: any[]){
    this.userService.updateParticipant(projectId ,user, participants);
  }

  removeUserAsParticipant(projectId, participantId, participants: any[]){
    this.userService.removeUserAsParticipant(projectId, participantId, participants);
  }
}
