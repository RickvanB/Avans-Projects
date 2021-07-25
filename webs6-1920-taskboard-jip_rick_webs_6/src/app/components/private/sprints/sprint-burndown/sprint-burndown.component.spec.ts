import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBurndownComponent } from './sprint-burndown.component';
import { getBurnDownServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { BurnDownService } from 'src/app/services/main_services/burn_down_service/burn-down.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let burndownSeriveSpy;

describe('SprintBurndownComponent', () => {
  let component: SprintBurndownComponent;
  let fixture: ComponentFixture<SprintBurndownComponent>;

  beforeEach(async(() => {

    burndownSeriveSpy = getBurnDownServiceSpy(testdata().charts); 

    TestBed.configureTestingModule({
      declarations: [ SprintBurndownComponent ],
      providers: [
        { provide: BurnDownService, useValue: burndownSeriveSpy },
      ],
      imports: [NgxChartsModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBurndownComponent);
    component = fixture.componentInstance;
    component.sprintId = testdata().sprints[0].id;
    component.projectId = testdata().projects[0].id;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
