import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthService] },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthService]},
  {
    path: 'pokemons',
    loadChildren: () => import('./pages/pokemons/pokemons.module').then( m => m.PokemonsPageModule), canActivate: [AuthService]
  },
  {
    path: 'catch',
    loadChildren: () => import('./pages/catch-them-all/catch-them-all.module').then( m => m.CatchThemAllPageModule), canActivate: [AuthService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule), canActivate: [AuthService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
