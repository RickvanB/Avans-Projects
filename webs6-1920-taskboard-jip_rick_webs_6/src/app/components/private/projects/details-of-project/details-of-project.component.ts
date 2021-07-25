import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { StoreKeys } from 'src/app/enums/store_keys';
import { Router } from '@angular/router';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';

@Component({
  selector: 'app-details-of-project',
  templateUrl: './details-of-project.component.html',
  styleUrls: ['./details-of-project.component.scss']
})
export class DetailsOfProjectComponent implements OnInit {

  @Input() project: Project;

  constructor(private storeService: StoreService, private router: Router, private projectService: MainProjectService) { }

  ngOnInit(): void {
  }

  /**
   * This method will archive an existing project
   */
  archiveProject(){
    if(this.project){
      this.project.isArchived = true;
      this.projectService.updateProject(this.project)
      //Close window
      this.project = null;
    }
  }

  /**
   * Navigate to edit component
   */
  navigateToEditProject(){
    this.storeService.setValue(StoreKeys.Project_Edit, this.project)
    this.router.navigate([`${this.project.name}/edit`]);
  }

  /**
   * Close view
   */
  closeDetails(){
    this.project = null;
  }
}
