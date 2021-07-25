import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProjectsComponent } from './components/private/projects/my-projects/my-projects.component';
import { AuthGuard } from './guard/auth.guard';
import { ProjectComponent } from './components/private/projects/project/project.component';
import { NewProjectComponent } from './components/private/projects/new-project/new-project.component';
import { EditProjectComponent } from './components/private/projects/edit-project/edit-project.component';
import { ArchivedProjectsComponent } from './components/private/projects/archived-projects/archived-projects.component';
import { NewStoryComponent } from './components/private/stories/new-story/new-story.component';
import { AddAsParticipantComponent } from './components/private/users/add-as-participant/add-as-participant.component';
import { EditStoryComponent } from './components/private/stories/edit-story/edit-story.component';
import { AddSprintComponent } from './components/private/sprints/add-sprint/add-sprint.component';
import { EditSprintComponent } from './components/private/sprints/edit-sprint/edit-sprint.component';
import { SprintBoardComponent } from './components/private/sprints/sprint-board/sprint-board.component';
import { SignInComponent } from './components/public/sign-in/sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '',
    component: MyProjectsComponent,
  },
  {
    path: 'projects',
    component: MyProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name/details',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name/edit',
    component: EditProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project/add',
    component: NewProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project/:id/participants',
    component: AddAsParticipantComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/archived',
    component: ArchivedProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userstory/add/:projectid',
    component: NewStoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userstory/:name:/edit/:projectid',
    component: EditStoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprint/add/:projectid',
    component: AddSprintComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprint/:name:/edit/:id',
    component: EditSprintComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprint/:sprintid/board/:projectid',
    component: SprintBoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: SignInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
