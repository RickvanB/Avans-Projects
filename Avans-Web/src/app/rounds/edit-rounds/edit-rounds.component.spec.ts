import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoundsComponent } from './edit-rounds.component';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../../testing/activated-route-stub';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {getSpeedmeetServiceSpy} from '../../../testing/serviceSpies';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterTestingModule} from '@angular/router/testing';

describe('EditRoundsComponent', () => {
  let component: EditRoundsComponent;
  let fixture: ComponentFixture<EditRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoundsComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: '1' })},
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
    fixture = TestBed.createComponent(EditRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
