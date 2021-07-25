import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  PROJECT = "projects";
  SPRINT = "sprints";
  USERSTORY = "userstories"

  constructor(private afs: AngularFirestore) {
  }

  /**
   * This method will subscribe on firebase collection of sprints
   */
  getAllSprints(projectId){
    return this.afs.collection(this.PROJECT).doc(projectId).collection<Sprint>(this.SPRINT).valueChanges();
  }

  getSprint(projectId, sprintId) : Observable<Sprint>{
    return combineLatest([
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(sprintId).valueChanges(),
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(sprintId).collection(this.USERSTORY).valueChanges()
    ]).pipe(map((values: any[]) => {
      let sprint = values[0];
      sprint.userstories = values[1];

      return sprint;
    }));
  }

  /**
   * This method will add a new sprint to the collection
   * @param sprint 
   */
  addSprint(sprint: Sprint): Promise<Sprint>{
    return this.afs.collection(this.PROJECT).doc(sprint.projectId).collection(this.SPRINT).add({
      name: sprint.name,
      description: sprint.description,
      isActive: sprint.isActive,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      projectId: sprint.projectId 
    }).then((docref) =>{
      sprint.id = docref.id;
      this.setId(docref.id, sprint.projectId)
      return sprint;
    }).catch( error => {
      console.log(error);
      return error;
    })
  }

  /**
   * Set id of doc
   * @param id 
   */
  private setId(id, projectId){
    var prToUpdate = this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(id);

    if(prToUpdate){
      prToUpdate.update({
        id: id
      })
    }
  }

   /**
   * This method will update a sprint of the collection
   * @param sprint 
   */
  updateSprint(sprint: Sprint): Promise<Sprint>{
    var spToUpdate = this.afs.collection(this.PROJECT).doc(sprint.projectId).collection(this.SPRINT).doc(sprint.id);
 
    if(spToUpdate){
      return spToUpdate.update({
        name: sprint.name,
        description: sprint.description,
        isActive: sprint.isActive,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        projectId: sprint.projectId 
      }).then( () => {
        return sprint;
      }).catch( error =>{
        return null;
      })
    }
  }

   /**
   * This method will delete a sprint from the collection
   * @param identifier 
   */
  deleteSprint(identifier, projectId): Promise<any>{
    return this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(identifier).delete().then(()=>{
      return;
    }).catch((error)=>{
      return error;
    });
  }

}
