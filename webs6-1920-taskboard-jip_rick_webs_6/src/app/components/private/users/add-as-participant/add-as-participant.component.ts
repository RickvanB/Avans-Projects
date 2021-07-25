import { Component, OnInit, Input } from '@angular/core';
import { Participant } from 'src/app/models/participant';
import { User } from 'src/app/models/user';
import { Roles } from 'src/app/enums/roles';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { Project } from 'src/app/models/project';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-as-participant',
  templateUrl: './add-as-participant.component.html',
  styleUrls: ['./add-as-participant.component.scss']
})
export class AddAsParticipantComponent implements OnInit {

  @Input() project: Project;
  participants: User[] = [];
  newUserEmail: string
  role: string;
  roles = [];
  noInput = false;
  userNotFound = false;
  userUpdate: string;

  constructor
  (
    private userService: MainUserService,
    private projectService: MainProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  { 
    for (let item in Roles) {
      this.roles.push(Roles[item])
    }
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.params.id;
    if(id){
      this.projectService.getProject(id).subscribe(project => {
        if(!project){
          return;
        }
        
        this.project = project;
        this.participants = [];
        // Get user of participant
        if(project.participants){
          project.participants.forEach(participant => {
            this.userService.getUser(participant.userId).subscribe(user => {
              user.role = participant.role; 
              this.participants.push(user);
            });
          });
        }
      })
    } 
  }

  /**
   * Method gets fired when role selector gots hit
   * @param role 
   */
  onSelectRole(role, participantId = null){
    if(participantId){
      this.participants.forEach(participant => {
        if(participant.id === participantId){
          participant.role = role;
          // Update user
          this.projectService.updateParticipant(this.project, participant, this.project.participants);
          this.userUpdate = `De rol van ${participant.fullName} is gewijzigd naar ${role}`
        }
      })
    } else{
      this.role = role;
    }
  
  }

  /**
   * This method will attach a new user to the project
   */
  addUser(){
    if(this.newUserEmail && this.newUserEmail != ""){
      this.userNotFound = false;
      this.noInput = false;
      this.userUpdate = null;
      this.userService.getUserByEmail(this.newUserEmail).subscribe(user =>{
        if(!user){
          this.userNotFound = true;
          return;
        }

        if(!this.role){
          user.role = Roles.Participater;
        } else{
          user.role = this.role;
        }

        // Add user as participant
        if(this.project){
          if(this.project.participants){
            this.project.participants.push({
              participationId: null,
              userId: user.id,
              role: user.role 
            })
          } else{
            this.project.participants = [ {
              participationId: null,
              userId: user.id,
              role: user.role
            }];
          }

          this.projectService.addParticipant(this.project, user, this.project.participants);
          this.newUserEmail = "";
        }
      })
    } else{
      this.noInput = true;
      this.userNotFound = false;
    }
  }

  /**
   * Remove user as participater of the project
   * @param id
   */
  removeUser(userId){
    if(this.project.participants){
      let particpants = [];

      this.project.participants.forEach(particpant => {
        if(particpant.userId !== userId){
          particpants.push(particpant);
        }
      }); 

      this.project.participants = particpants;

    } else{
      this.project.participants = [];
    }

    this.projectService.removeParticipant(this.project, userId, this.project.participants);
  }

  backToProject(){
    this.router.navigate([`${this.project.name}/details`])
  }
}
