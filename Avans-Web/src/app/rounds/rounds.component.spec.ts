import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsComponent } from './rounds.component';
import { SpeedmeetService } from '../services/speedmeet.service';
import { getSpeedmeetServiceSpy } from '../../testing/serviceSpies';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('RoundsComponent', () => {
  let component: RoundsComponent;
  let fixture: ComponentFixture<RoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundsComponent ],
      imports: [MatSnackBarModule, MatDialogModule],
      providers: [
        {provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
