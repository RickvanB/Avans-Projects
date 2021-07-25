import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthService } from './services/auth.service';
import { TargetService } from './services/target.service';
import { TokenService } from './services/token.service';
import { HttpClientModule } from '@angular/common/http';
import { TargetsComponent } from './targets/targets.component';
import { TokencatcherComponent } from './tokencatcher/tokencatcher.component';
import { NewTargetComponent } from './new-target/new-target.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttemptComponent } from './attempt/attempt.component';
import { TargetDetailComponent } from './target-detail/target-detail.component';
import { AttemptDetailComponent } from './attempt-detail/attempt-detail.component';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomepageComponent } from './homepage/homepage.component';
import { NotifierModule } from "angular-notifier";


const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'targets', component: TargetsComponent },
  { path: 'target/:id', component: TargetDetailComponent },
  { path: 'attempt/:id', component: AttemptDetailComponent },
  { path: 'tokencatcher/:token', component: TokencatcherComponent },
  { path: 'targets/new', component: NewTargetComponent },
  { path: 'target/:id/attempt', component: AttemptComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'player/:id', component: PlayerDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TargetsComponent,
    TokencatcherComponent,
    NewTargetComponent,
    AttemptComponent,
    TargetDetailComponent,
    AttemptDetailComponent,
    PlayersComponent,
    PlayerDetailComponent,
    HomepageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NotifierModule
  ],
  providers: [
    AuthService,
    TargetService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
