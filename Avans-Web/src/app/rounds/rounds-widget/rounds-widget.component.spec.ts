import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundsWidgetComponent } from './rounds-widget.component';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {getSpeedmeetServiceSpy} from '../../../testing/serviceSpies';

describe('RoundsWidgetComponent', () => {
  let component: RoundsWidgetComponent;
  let fixture: ComponentFixture<RoundsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundsWidgetComponent ],
      providers: [
        {provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
