import { Injectable } from '@angular/core';
import { Project } from 'src/app/models/project';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects = new BehaviorSubject<Project[]>([])
  PROJECT = "projects";
  SPRINT = "sprints";
  PARTICIPANTS = "participants"

  constructor(private afs: AngularFirestore){
   this.subscribeOnProjects();
  }

  /**
   * Subscribe on firebase collection of projects
   */
  private subscribeOnProjects(){
    this.afs.collection<Project>(this.PROJECT).valueChanges().subscribe(projects => {
      this.projects.next(projects)
    })
  }

  /**
   * Return one project
   * @param projectId 
   */
  getProject(projectId): Observable<Project> {
    return combineLatest([
      this.afs.collection(this.PROJECT).doc(projectId).valueChanges(),
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).valueChanges(),
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.PARTICIPANTS).valueChanges()
    ]).pipe(map((values: any[]) => {
      let project = values[0];
      if(project){
        project.sprints = values[1];
        project.participants = values[2];
      }
      return project;
    }));
  }

  /**
   * Add new project to firebase 
   * @param project 
   */
  addProject(project: Project): Promise<Project>{

    let projectId;
    return this.afs.collection(this.PROJECT).add({
      name: project.name,
      status: project.status,
      isArchived: project.isArchived,
      description: project.description,
      ownerId: project.ownerId,
      participants: project.participants
    }).then((docref) => {
      // Add subcollection
      projectId = docref.id;
      this.afs.collection(this.PROJECT).doc(docref.id).collection(this.SPRINT).add({
        name: "First Sprint",
        description: "Auto-Generated Sprint",
        isActive: false,
        startDate: null,
        endDate: null,
        projectId: docref.id,
        id: null
      }).then((docref) => {
        this.setSprintId(docref.id, projectId);
      });

      this.afs.collection(this.PROJECT).doc(docref.id).collection(this.PARTICIPANTS).doc(project.ownerId).set({
        userId : project.ownerId,
        role: "Project Manager"
      });

      project.id = docref.id;
      this.setId(docref.id)
      return project;
    }).catch(error => {
      return null;
    });
  }

  private setSprintId(id, projectId){
    if(id && projectId){
      this.afs.collection(this.PROJECT).doc(projectId).collection(this.SPRINT).doc(id).update({
        id: id
      })
    }
  }

  private setId(id){
    var prToUpdate = this.afs.collection(this.PROJECT).doc(id);

    if(prToUpdate){
      prToUpdate.update({
        id: id
      })
    }
  }

  /**
   * Update existing project to firebase
   * @param project 
   */
  updateProject(project: Project): Promise<Project>{
    var prToUpdate = this.afs.collection(this.PROJECT).doc(project.id);

    if(prToUpdate){
      return prToUpdate.update({
        name: project.name,
        status: project.status,
        isArchived: project.isArchived,
        description: project.description,
        ownerId: project.ownerId,
        participants: project.participants
      }).then((docref) => {
        return project;
      }).catch(error => {
        return null;
      });
    }
  }

  /**
   * Delete project from firebase
   * @param identifier 
   */
  deleteProject(identifier) : Promise<any>{
    return this.afs.collection(this.PROJECT).doc(identifier).delete().then(()=>{
      return;
    }).catch((error)=>{
      return error;
    });
  }
}
