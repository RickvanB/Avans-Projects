import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoundsComponent } from './add-rounds.component';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {getSpeedmeetServiceSpy} from '../../../testing/serviceSpies';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';

describe('AddRoundsComponent', () => {
  let component: AddRoundsComponent;
  let fixture: ComponentFixture<AddRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoundsComponent ],
      providers: [
        {provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy()}
      ],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
