import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfProjectComponent } from './details-of-project.component';
import { getStoreServivceServiceSpy, getProjectServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';

let storeServiceSpy;
let projectServiceSpy;


describe('DetailsOfProjectComponent', () => {
  let component: DetailsOfProjectComponent;
  let fixture: ComponentFixture<DetailsOfProjectComponent>;

  beforeEach(async(() => {

    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ DetailsOfProjectComponent ],
      providers: [
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
      ],
      imports: [
          RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfProjectComponent);
    component = fixture.componentInstance;
    component.project = testdata().projects[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a project', () =>{
    expect(component.project).toBeDefined();
  })

  it('should close details', () =>{
    component.closeDetails();
    expect(component.project).toBeNull();
  })
});
