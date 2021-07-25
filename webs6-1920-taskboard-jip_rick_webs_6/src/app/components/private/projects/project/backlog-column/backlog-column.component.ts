import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { UserStory } from 'src/app/models/userStory';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-backlog-column',
  templateUrl: './backlog-column.component.html',
  styleUrls: ['./backlog-column.component.scss']
})
export class BacklogColumnComponent implements OnInit {

  @Input() project: Project;
  columnTitle: string;
  stories : Observable<UserStory[]>;
  isArchived : boolean;

  constructor(private userStoryService : MainUserstoryService) {
    this.isArchived = false;
  }

  ngOnInit(): void {
    if(this.project != null){
      this.stories = this.userStoryService.getAvailableUserStories(null, this.project.id).pipe(
        map(stories => stories.filter(story => story.isArchived == this.isArchived))
      );
    }
  }

  toggleArchived(event) {
    if(event.target.checked) {
      this.isArchived = true;
    } else {
      this.isArchived = false;
    }

    this.ngOnInit();
  }

}
