import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import { getProjectServiceSpy, getAuthServivceServiceSpy, getStoreServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

let projectServiceSpy;
let authServiceSpy;
let storeServiceSpy;

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;

  beforeEach(async(() => {

    projectServiceSpy = getProjectServiceSpy(testdata().projects);
    authServiceSpy = getAuthServivceServiceSpy(testdata().users[0])
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);

    TestBed.configureTestingModule({
      declarations: [ EditProjectComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
      ],
      imports: [
          RouterTestingModule,
          FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change status', () => {
    component.onSelectStatus("1");

    expect(component.project.status).toEqual("1");
  })

  // it('name field should contain project name', ()=> {
  //   fixture.whenStable().then( () => {
  //     const nameField = fixture.debugElement.query(By.css('.projectName')).nativeElement;
  //     expect(nameField.value).toEqual(testdata().projects[0].name)
  //   })
  // })
});
