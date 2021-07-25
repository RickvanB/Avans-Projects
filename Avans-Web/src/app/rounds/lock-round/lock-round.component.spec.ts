import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { LockRoundComponent } from './lock-round.component';
import { TimeslotsService } from 'src/app/services/timeslots.service';
import { getTimeslotServiceSpy, getSpeedmeetServiceSpy } from 'src/testing/serviceSpies';
import { SpeedmeetService } from 'src/app/services/speedmeet.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LockRoundComponent', () => {
  let component: LockRoundComponent;
  let fixture: ComponentFixture<LockRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockRoundComponent ],
      imports: [MatDialogModule, RouterTestingModule, MatSnackBarModule],
      providers: [
        { provide: TimeslotsService, useValue: getTimeslotServiceSpy },
        { provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
