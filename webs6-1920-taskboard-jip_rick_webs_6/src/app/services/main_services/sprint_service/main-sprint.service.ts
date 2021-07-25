import { Injectable } from '@angular/core';
import { SprintService } from '../../sub_services/sprint/sprint.service';
import { Sprint } from 'src/app/models/sprint';
import { Observable } from 'rxjs';
import { sprintValidator } from 'src/app/validators/sprintValidator';
import { map, filter } from 'rxjs/operators';
import { MainUserstoryService } from '../userstory_service/main-userstory.service';
import { MainProjectService } from '../project_service/main-project.service';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class MainSprintService {

  private sprintValidator = new sprintValidator();

  constructor(private sprintService: SprintService, private userStoryService : MainUserstoryService) { }

  /**
   * This method will subscribe on a list of all sprins
   */
  subScribeOnSprints(projectId): Observable<Sprint[]>{
    return this.sprintService.getAllSprints(projectId);
  }

  getSprint(projectId, sprintId): Observable<Sprint>{
    return this.sprintService.getSprint(projectId, sprintId);
  }

  /**
   * Adds a new sprint
   * @param sprint Sprint
   */
  addSprint(sprint : Sprint, userstories : [], project: Project) : string[] {
      if(project.sprints) {
        let statusOK = true;
        project.sprints.forEach(sprintObj => {
          if(sprintObj.isActive && sprint.isActive){
            statusOK = false;
            return;
          }
        });

        if(!statusOK) {
          return ["active"];
        }

        let result = this.sprintValidator.validateSprint(sprint);
        if(result.length == 0) {
          this.sprintService.addSprint(sprint).then(sprint => {
            if(!sprint) {
              return ["Failed"];
            }
    
            if(userstories){
              userstories.forEach(storyId => {
                var subscription = this.userStoryService.getUserStory(storyId, sprint.id, sprint.projectId).subscribe(storyObj => {
                  this.userStoryService.addToSprint(project.id, sprint.id, storyObj);
                  subscription.unsubscribe();
                });
              });
            }
          });
        } else {
          return result;
        }
      }
    return [];
  }

  /**
   * Updates a sprint
   * @param sprint Sprint
   */
  updateSprint(sprint : Sprint, userstories : [], project : Project, projectId : String) {
    let statusOK = true;
    project.sprints.forEach(sprintObj => {
      if(sprintObj.isActive && sprint.isActive && sprint.id != sprintObj.id) {
        statusOK = false;
        return;
      }
    });

    if(!statusOK) {
      return ["active"];
    }

    let result = this.sprintValidator.validateSprint(sprint);
    if(result.length == 0) {
      this.sprintService.updateSprint(sprint).then(sprint => {
        if(!sprint) {
          return ["Failed"];
        }

        if(userstories) {
          userstories.forEach(storyId => {
            var subscription = this.userStoryService.getUserStory(storyId, sprint.id, sprint.projectId).subscribe(storyObj => {
              this.userStoryService.addToSprint(projectId, sprint.id, storyObj);
              subscription.unsubscribe();
            });
          });
        }
        return sprint;
      });
    } else {
      return result;
    }
  }

  /**
   * Removes a sprint
   * @param sprint Sprint
   */
  deleteSprint(sprint : Sprint) {
    this.sprintService.deleteSprint(sprint.id, sprint.projectId);
  }
}
