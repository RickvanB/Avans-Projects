import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint-column',
  templateUrl: './sprint-column.component.html',
  styleUrls: ['./sprint-column.component.scss']
})
export class SprintColumnComponent implements OnInit {

  @Input() project: Project;
  columnTitle: string;
  sprints :Sprint[];

  constructor(
    private projectService : MainProjectService,
    private storeService : StoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.projectService.getProject(this.project.id).subscribe(project => {
      this.sprints = project.sprints;
    });
  }
  
  currentProject() {
    this.storeService.setValue(StoreKeys.Project_Id, this.project.id);
    this.router.navigate(['/sprint/add']);
  }

}
