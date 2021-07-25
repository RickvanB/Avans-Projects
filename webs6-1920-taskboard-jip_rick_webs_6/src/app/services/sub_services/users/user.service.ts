import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users = new BehaviorSubject<User[]>([]);
  USERS = "users";
  PROJECT = "projects";
  PARTICIPANTS = "participants"

  constructor(private afs: AngularFirestore) {
    this.subscribeOnUsers();
  }

  /**
   * This method will subscribe on the list of users
   */
  private subscribeOnUsers(){
    this.afs.collection<User>(this.USERS).valueChanges().subscribe(users =>{
      this.users.next(users);
    });
  }


  addUserAsParticipant(projectId, user: User, participants: any[]){
    this.afs.collection(this.PROJECT).doc(projectId).collection(this.PARTICIPANTS).doc(user.id).set({
      role: user.role,
      userId: user.id
    });

    this.afs.collection(this.PROJECT).doc(projectId).update({
      participants: participants
    }).then( () => {});
  }

  updateParticipant(projectId, user: User, participants: any[]){
    this.afs.collection(this.PROJECT).doc(projectId).collection(this.PARTICIPANTS).doc(user.id).update({
      role: user.role,
      userId: user.id
    });

    this.afs.collection(this.PROJECT).doc(projectId).update({
      participants: participants
    }).then( () => {});
  }

  removeUserAsParticipant(projectId, participantId, participants: any[]){
    this.afs.collection(this.PROJECT).doc(projectId).collection(this.PARTICIPANTS).doc(participantId).delete();

    this.afs.collection(this.PROJECT).doc(projectId).update({
      participants: participants
    }).then( () => {});
  }

}
