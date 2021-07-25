import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './navbar/navbar.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { StudentListComponent } from './student-list/student-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CompanyCrudComponent } from './company/company-crud/company-crud.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { CompanyMajorComponent } from './company/company-major/company-major.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddEducationsComponent } from './educations/add-educations/add-educations.component';
import { OverviewEducationsComponent } from './educations/overview-educations/overview-educations.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UpdateEducationsComponent } from './educations/update-educations/update-educations.component';
import { RoundsComponent } from './rounds/rounds.component';
import { AddRoundsComponent } from './rounds/add-rounds/add-rounds.component';
import { EditRoundsComponent } from './rounds/edit-rounds/edit-rounds.component';
import { MatIconModule } from '@angular/material/icon';
import { RoundsWidgetComponent } from './rounds/rounds-widget/rounds-widget.component';
import { MoveRoundsComponent } from './rounds/move-rounds/move-rounds.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { CompanyRoundsComponent } from './company/company-rounds/company-rounds.component';
import { LockRoundComponent } from './rounds/lock-round/lock-round.component';
import { LockRoundDialogComponent } from './rounds/lock-round-dialog/lock-round-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginCompanyComponent } from './login-company/login-company.component';
import { EditDialogComponent } from './shared/edit-dialog/edit-dialog.component';
import { DashboardCompanyComponent } from './dashboard/dashboard-company/dashboard-company.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    RegisterComponent,
    NavbarComponent,
    CompaniesComponent,
    StudentListComponent,
    CompanyCrudComponent,
    ConfirmationDialogComponent,
    CompanyDetailsComponent,
    AddEducationsComponent,
    OverviewEducationsComponent,
    UpdateEducationsComponent,
    CompanyMajorComponent,
    RoundsComponent,
    AddRoundsComponent,
    RoundsWidgetComponent,
    EditRoundsComponent,
    MoveRoundsComponent,
    CompanyRoundsComponent,
    LockRoundComponent,
    LockRoundDialogComponent,
    LoginCompanyComponent,
    EditDialogComponent,
    DashboardCompanyComponent,
    DashboardAdminComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        MatRippleModule,
        MatDialogModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
