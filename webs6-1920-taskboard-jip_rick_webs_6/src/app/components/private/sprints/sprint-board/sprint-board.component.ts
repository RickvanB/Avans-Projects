import { Component, OnInit } from '@angular/core';
import { BoardParticipant } from 'src/app/models/boardParticipant';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userStory';
import { User } from 'src/app/models/user';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { UserStoryStatus } from 'src/app/enums/userStoryStatus';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { UserService } from 'src/app/services/sub_services/users/user.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';

@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.scss']
})
export class SprintBoardComponent implements OnInit {

  participants: BoardParticipant[];
  projectId;
  sprintId;

  constructor(private storyService: MainUserstoryService, private projectService: MainProjectService,
    private userService: MainUserService, private route : ActivatedRoute, private storeService: StoreService,
    private router: Router ) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get("sprintid")
    this.projectId = this.route.snapshot.paramMap.get("projectid")
    this.getProject();
  }

  /**
   * This method will get all data that is needed for the scrumboard
   * Eventualy it will combine the data as well
   */
  getProject(){
    this.projectService.getProject(this.projectId).subscribe(project => {
      if(!project){
        return;
      }
      if(project.participants){
        // Add participant for user stories which are not assigend to a user yet
        this.participants = [{
          user: null,
          done: [],
          inProgress: [],
          readyForReview: [], 
          todo: []
        }];
        for(let participant of project.participants){

          this.userService.getUser(participant.userId).subscribe(user => {
            if(user){
              var done: UserStory[] = [];
              var inProgress: UserStory[] = [];
              var readyForReview: UserStory[] = [];
              var todo: UserStory[] = [];

              // Create object and push into array
              this.participants.push(
                {
                  user: user,
                  done: done,
                  inProgress: inProgress,
                  readyForReview: readyForReview, 
                  todo: todo
                }
              );
            }
          });
        }
        if(project.sprints){
          project.sprints.forEach(sprint => {
            if(sprint.id == this.sprintId){
              this.getStories(sprint.id);
            }
          });
        }
      }
    });
  }
  /**
   * This method will get all the stories that are on this scrumboard
   */
  getStories(sprintId: string){
    this.storyService.getAvailableUserStories(sprintId, this.projectId).subscribe(stories => {
      if(!stories || !this.participants){
        return;
      }
      // Clear lists
      this.participants.forEach(participant => {
        participant.inProgress = [];
        participant.done = [];
        participant.todo = [];
        participant.readyForReview = [];
      })

      stories.forEach(story => {
        this.participants.forEach(participant => {
          if(participant.user){
            if(story.taskOfId == participant.user.id && !story.isArchived){
              switch(story.status){
                case UserStoryStatus.IN_DEVELOPMENT:
                  participant.inProgress.push(story);
                  break;
                case UserStoryStatus.READY_FOR_REVIEW:
                  participant.readyForReview.push(story);
                  break;
                case UserStoryStatus.DONE:
                  participant.done.push(story);
                  break;
                default:
                  participant.todo.push(story);
                  break;
              }
            }
          } else {
            if(!story.isArchived && !story.taskOfId){
              switch(story.status){
                case UserStoryStatus.IN_DEVELOPMENT:
                  participant.inProgress.push(story);
                  break;
                case UserStoryStatus.READY_FOR_REVIEW:
                  participant.readyForReview.push(story);
                  break;
                case UserStoryStatus.DONE:
                  participant.done.push(story);
                  break;
                default:
                participant.todo.push(story);
                break;
              }
            }
          }
        });   
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem
      (
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    
    // Find moved card in arrays
    const id = event.item.element.nativeElement.id;
    this.participants.forEach(participant => {
      participant.todo.forEach(card => {
        if(card.id === id){
          this.updateCard(participant.user, card, UserStoryStatus.TODO, this.projectId);
        }
      })
      participant.inProgress.forEach(card => {
        if(card.id === id){
          this.updateCard(participant.user, card, UserStoryStatus.IN_DEVELOPMENT, this.projectId);
        }
      })
      participant.readyForReview.forEach(card => {
        if(card.id === id){
          this.updateCard(participant.user, card, UserStoryStatus.READY_FOR_REVIEW, this.projectId);
        }
      })
      participant.done.forEach(card => {
        if(card.id === id){
          this.updateCard(participant.user, card, UserStoryStatus.DONE, this.projectId);
        }
      })
    })
  }

  /**
   * Update an existing card
   * @param participant 
   * @param card 
   */
  private updateCard(participant: User, card: UserStory, status: number, projectId: string){
    if(!card || !status ){
      return;
    }

    if(status == UserStoryStatus.DONE){
      card.movedToDone =  new Date();
    } else{
      card.movedToDone = null;
    }

    // Update values
    if(participant){
      card.taskOf = participant;
      card.taskOfId = participant.id;
    } else{
      card.taskOf = null;
      card.taskOfId = null;
    }
    card.status = status;

    //Send update to the database
    var result = this.storyService.updateUserStory(card, projectId);

    if(result){
      // Error
      
    }
  }

  goBack(){
    this.storeService.setValue(StoreKeys.Project_Id, this.projectId);
    this.router.navigate([`/project/details`]);
  }
}
