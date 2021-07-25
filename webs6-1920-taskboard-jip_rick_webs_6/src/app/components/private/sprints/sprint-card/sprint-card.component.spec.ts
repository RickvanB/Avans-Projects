import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintCardComponent } from './sprint-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { testdata } from 'src/app/testing/test-data';

let storeServiceSpy;

describe('SprintCardComponent', () => {
  let component: SprintCardComponent;
  let fixture: ComponentFixture<SprintCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintCardComponent ],
      providers: [
        {provide: StoreService, useValue: storeServiceSpy},
      ],
      imports : [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintCardComponent);
    component = fixture.componentInstance;
    component.data = testdata().sprints[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
