import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthCompanyGuard } from './guards/auth-company.guard';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardCompanyComponent } from './dashboard/dashboard-company/dashboard-company.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { RegisterComponent } from './register/register.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CompanyCrudComponent } from './company/company-crud/company-crud.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { AddEducationsComponent } from './educations/add-educations/add-educations.component';
import { OverviewEducationsComponent } from './educations/overview-educations/overview-educations.component';
import { UpdateEducationsComponent } from './educations/update-educations/update-educations.component';
import { CompanyMajorComponent } from './company/company-major/company-major.component';
import { RoundsComponent } from './rounds/rounds.component';
import { AddRoundsComponent } from './rounds/add-rounds/add-rounds.component';
import { EditRoundsComponent } from './rounds/edit-rounds/edit-rounds.component';
import { MoveRoundsComponent } from './rounds/move-rounds/move-rounds.component';
import { CompanyRoundsComponent } from './company/company-rounds/company-rounds.component';
import { LoginCompanyComponent } from './login-company/login-company.component';
import { LockRoundComponent } from './rounds/lock-round/lock-round.component';
import { AuthCompanyAdminGuard } from './guards/auth-company-admin.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-dashboard',
    component: DashboardCompanyComponent,
    canActivate: [AuthCompanyGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'Companylogin',
    component: LoginCompanyComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'companies/:id/students',
    component: StudentListComponent,
    canActivate: [AuthCompanyAdminGuard]
  },
  {
    path: 'educations/add',
    component: AddEducationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'educations/edit/:id',
    component: UpdateEducationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'educations',
    component: OverviewEducationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies-overview',
    component: CompaniesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies',
    component: CompanyCrudComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies/:id',
    component: CompanyDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'companies/:companyId/rounds',
    component: CompanyRoundsComponent,
    canActivate: [AuthCompanyAdminGuard]
  },
  {
    path: 'companies/:companyId/rounds/:id/lock',
    component: LockRoundComponent,
    canActivate: [AuthCompanyAdminGuard]
  },
  {
    path: 'major/:id',
    component: CompanyMajorComponent,
    canActivate: [AuthCompanyAdminGuard]
  },
  {
    path: 'rounds',
    component: RoundsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rounds/add',
    component: AddRoundsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rounds/move',
    component: MoveRoundsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rounds/:id/edit',
    component: EditRoundsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
