import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/public/navigation/navigation.component';
import { MyProjectsComponent } from './components/private/projects/my-projects/my-projects.component';
import { ProjectComponent } from './components/private/projects/project/project.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { NewProjectComponent } from './components/private/projects/new-project/new-project.component';
import { FormsModule } from '@angular/forms';
import { EditProjectComponent } from './components/private/projects/edit-project/edit-project.component';
import { ArchivedProjectsComponent } from './components/private/projects/archived-projects/archived-projects.component';
import { DetailsOfProjectComponent } from './components/private/projects/details-of-project/details-of-project.component';
import { StoriesComponent } from './components/private/stories/stories.component';
import { NewStoryComponent } from './components/private/stories/new-story/new-story.component';
import { EditStoryComponent } from './components/private/stories/edit-story/edit-story.component';
import { SprintColumnComponent } from './components/private/projects/project/sprint-column/sprint-column.component';
import { ParticipantsColumnComponent } from './components/private/projects/project/participants-column/participants-column.component';
import { BacklogColumnComponent } from './components/private/projects/project/backlog-column/backlog-column.component';
import { SprintCardComponent } from './components/private/sprints/sprint-card/sprint-card.component';
import { StoryCardComponent } from './components/private/stories/story-card/story-card.component';
import { UserCardComponent } from './components/private/users/user-card/user-card.component';
import { AddAsParticipantComponent } from './components/private/users/add-as-participant/add-as-participant.component';
import { AddSprintComponent } from './components/private/sprints/add-sprint/add-sprint.component';
import { EditSprintComponent } from './components/private/sprints/edit-sprint/edit-sprint.component';
import { SprintBoardComponent } from './components/private/sprints/sprint-board/sprint-board.component';
import { SprintBurndownComponent } from './components/private/sprints/sprint-burndown/sprint-burndown.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectTableComponent } from './components/private/projects/project/project-table/project-table/project-table.component';
import { SignInComponent } from './components/public/sign-in/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MyProjectsComponent,
    ProjectComponent,
    NewProjectComponent,
    EditProjectComponent,
    ArchivedProjectsComponent,
    DetailsOfProjectComponent,
    StoriesComponent,
    NewStoryComponent,
    EditStoryComponent,
    SprintColumnComponent,
    ParticipantsColumnComponent,
    BacklogColumnComponent,
    SprintCardComponent,
    StoryCardComponent,
    UserCardComponent,
    AddAsParticipantComponent,
    AddSprintComponent,
    EditSprintComponent,
    SprintBoardComponent,
    SprintBurndownComponent,
    ProjectTableComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    DragDropModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
