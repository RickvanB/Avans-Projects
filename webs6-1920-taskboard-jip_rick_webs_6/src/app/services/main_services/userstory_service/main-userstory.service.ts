import { Injectable } from '@angular/core';
import { UserStory } from 'src/app/models/userStory';
import { Observable } from 'rxjs';
import { userstoryValidator } from 'src/app/validators/userstoryValidator';
import { UserStoryService } from '../../sub_services/user_story/user-story.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { MainUserService } from '../user_service/main-user.service';
import { MainProjectService } from '../project_service/main-project.service';

@Injectable({
  providedIn: 'root'
})
export class MainUserstoryService {

  private validator: userstoryValidator = new userstoryValidator();


  constructor(private userStoryService: UserStoryService) { }

  /**
   * This method will subscribe on a list of all userStories
   */
  subscribeOnUserStories(projectId, sprintId): Observable<UserStory[]>{
    return this.userStoryService.getAllUserStories(projectId, sprintId);
  }
  
  getAvailableUserStories(sprintId : string, projectId: string) : Observable<UserStory[]> {
      return this.subscribeOnUserStories(projectId, sprintId);
  }

  /**
   * Creates a new user story
   * @param userStory UserStory
   */
  createNewUserStory(userStory : UserStory, projectId) : string[] {

    let result = this.validator.validateUserstory(userStory);

    if(!result) {
      this.userStoryService.addUserStory(userStory, projectId).then(success => {
        if(!success) {
          return ["Failed"];
        }

        return null;
      })
    } else {
      return result;
    }
  }

  /**
   * Updates an existing user story
   * @param userStory UserStory
   */
  updateUserStory(userStory : UserStory, projectId) : string[] {
    if(!userStory.movedToDone){
      userStory.movedToDone = null;
    }

    let result = this.validator.validateUserstory(userStory);
    if(!result) {
      this.userStoryService.updateUserStory(userStory, projectId).then(success => {
        if(!success) {
          return ["Failed"];
        }

        return null;
       })
    } else {
      return result;
    }
  }

  addToSprint(projectId, sprintId, userstory: UserStory){
    // Add userstory to the sprint
    userstory.sprintId = sprintId;
    this.userStoryService.addUserStory(userstory, projectId);

    // Remove from backlog
    this.userStoryService.deleteUserStory(userstory.id, projectId, null);
  }

  removeFromSprint(projectId, sprintId, userstory: UserStory){
    // Add userstory to the backlog
    userstory.sprintId = null;
    this.userStoryService.addUserStory(userstory, projectId);

    // Remove from sprint
    this.userStoryService.deleteUserStory(userstory.id, projectId, sprintId);
  }

  /**
   * Deletes an user story
   * @param userStory UserStory
   */
  deleteUserStory(userStory : UserStory, projectId, sprintId) : void {
    this.userStoryService.deleteUserStory(userStory.id, projectId, sprintId);
  }

  /**
   * This method will get a specified user story
   * @param identifier 
   */
  getUserStory(identifier, sprintId, projectId): Observable<UserStory> {
    return this.userStoryService.getUserStory(projectId, sprintId, identifier)
  }
}
