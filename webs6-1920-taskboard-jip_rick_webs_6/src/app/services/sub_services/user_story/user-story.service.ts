import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { UserStory } from 'src/app/models/userStory';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  PROJECT = "projects";
  SPRINT = "sprints";
  USERSTORY = "userstories"

  constructor(private afs: AngularFirestore) { 
  }

  /**
   * This method will subscribe on user stories collection of firebase
   */
  getAllUserStories(projectId, sprintId){
    if(!sprintId){
      return this.afs.collection(this.PROJECT).doc(projectId).collection<UserStory>(this.USERSTORY).valueChanges();
    } else{
      return this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(sprintId).collection<UserStory>(this.USERSTORY).valueChanges();
    }
  }

  getUserStory(projectId, sprintId, storyId) : Observable<UserStory>{
    return combineLatest([
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(sprintId).collection(this.USERSTORY).doc(storyId).valueChanges(),
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.USERSTORY).doc(storyId).valueChanges()
    ]).pipe(map((values: any[]) => {
      if(sprintId){
        return values[1];
      } else {
      return values[0];
      }
    }));
  }


  /**
   * This method will add a new userstory to the collection
   * @param userStory 
   */
  addUserStory(userStory: UserStory, projectId) : Promise<UserStory> {
    if(!userStory.sprintId) {
      return this.afs.collection(this.PROJECT).doc(projectId).collection(this.USERSTORY).add({
        name: userStory.name,
        description: userStory.description,
        status: userStory.status,
        storyPoints: userStory.storyPoints,
        isArchived: userStory.isArchived,
        ownerId: userStory.ownerId,
        sprintId: userStory.sprintId,
        taskOfId: userStory.taskOfId
      }).then( (docref) => {
        userStory.id = docref.id;
        this.setId(docref.id, projectId, null)
        return userStory;
      }).catch( error => {
        console.log(error);
        return null;
      });
    } else {
      return this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(userStory.sprintId).collection(this.USERSTORY).add({
        name: userStory.name,
        description: userStory.description,
        status: userStory.status,
        storyPoints: userStory.storyPoints,
        isArchived: userStory.isArchived,
        ownerId: userStory.ownerId,
        sprintId: userStory.sprintId,
        taskOfId: userStory.taskOfId
      }).then( (docref) => {
        userStory.id = docref.id;
        this.setId(docref.id, projectId, userStory.sprintId)
        return userStory;
      }).catch( error => {
        console.log(error);
        return null;
      });
    }
  }

  /**
   * Set id of doc
   * @param id 
   */
  private setId(id, projectId, sprintId){
    if(sprintId){
      var prToUpdate = this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(sprintId).collection(this.USERSTORY).doc(id);
    } else{
      var prToUpdate = this.afs.collection(this.PROJECT).doc(projectId).collection(this.USERSTORY).doc(id);   
    }

    if(prToUpdate){
      prToUpdate.update({
        id: id
      })
    }
  }

  /**
   * This method will update a userstory in the collection
   * @param userStory 
   */
  updateUserStory(userStory: UserStory, projectId) : Promise<UserStory> {
    if(!userStory.sprintId) {
      var usToUpdate = this.afs.collection(this.PROJECT).doc(projectId).collection(this.USERSTORY).doc(userStory.id);
    } else {
      var usToUpdate = this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(userStory.sprintId).collection(this.USERSTORY).doc(userStory.id);
    }
    if(usToUpdate) {
      return usToUpdate.set({
        id: userStory.id, 
        name: userStory.name,
        description: userStory.description,
        status: userStory.status,
        storyPoints: userStory.storyPoints,
        isArchived: userStory.isArchived,
        ownerId: userStory.ownerId,
        sprintId: userStory.sprintId,
        taskOfId: userStory.taskOfId,
        movedToDone: userStory.movedToDone
      }).then( (docref) => {
        return userStory;
      }).catch( error => {
        console.log(error);
        return error;
      });
    }
   
  }

  /**
   * This method will remove a userstory from the collection
   * @param userStory 
   */
  deleteUserStory(identifier, projectId, sprintId) : Promise<any> {
    if(sprintId){
      return this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(sprintId).collection(this.USERSTORY).doc(identifier).delete().then(()=>{
        return;
      }).catch((error)=>{
        return error;
      });
    } else{
      return this.afs.collection(this.PROJECT).doc(projectId).collection(this.USERSTORY).doc(identifier).delete().then(()=>{
        return;
      }).catch((error)=>{
        return error;
      });
    }
    
  }
}
