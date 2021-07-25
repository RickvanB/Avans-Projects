import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from 'src/app/models/sprint';
import { StoreKeys } from 'src/app/enums/store_keys';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {

  @Input() data : Sprint;

  constructor(private storeService : StoreService, private router : Router) { }

  ngOnInit(): void {
  }

  goToEdit(sprint : Sprint) {
    this.storeService.setValue(StoreKeys.Sprint_Edit, sprint);
    this.router.navigate([`sprint/${sprint.name}/edit/${sprint.projectId}`]);
  }

  goToSprintBoard(sprint : Sprint) {
    this.storeService.setValue(StoreKeys.Sprint_Edit, sprint);
    this.router.navigate([`sprint/${sprint.id}/board/${sprint.projectId}`]);
  }

}
