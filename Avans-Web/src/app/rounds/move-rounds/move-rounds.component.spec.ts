import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveRoundsComponent } from './move-rounds.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {getSpeedmeetServiceSpy} from '../../../testing/serviceSpies';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

describe('MoveRoundsComponent', () => {
  let component: MoveRoundsComponent;
  let fixture: ComponentFixture<MoveRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveRoundsComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
