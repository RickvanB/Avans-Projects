import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from '../../../../../enums/store_keys'
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { Roles } from 'src/app/enums/roles';

@Component({
  selector: 'app-participants-column',
  templateUrl: './participants-column.component.html',
  styleUrls: ['./participants-column.component.scss']
})
export class ParticipantsColumnComponent implements OnInit {

  @Input() project: Project;
  participants: User[];

  
  constructor
  (
    private userService: MainUserService,
    private router: Router,
    private storeService: StoreService,
    private projectService: MainProjectService
  ) { }

  ngOnInit(): void {
    if(this.project){
      this.projectService.getProject(this.project.id).subscribe(project =>{
        this.project = project
        this.participants = [];
        if(project.participants){
          project.participants.forEach(participant => {
            this.userService.getUser(participant.userId).subscribe( user => {
              user.role = participant.role;
              this.participants.push(user);
            })
          });
        }
      }); 
    }
  }

  /**
   * This method will navigate to the add participants page
   */
  navigateToAddParticipants(){ 
    this.storeService.setValue(StoreKeys.Project_Participants, this.project); 
    this.router.navigate([`project/${this.project.id}/participants`])
  }

}
