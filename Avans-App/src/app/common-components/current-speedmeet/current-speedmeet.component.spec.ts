import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentSpeedmeetComponent } from './current-speedmeet.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {testData} from '../../../testing/test-data';
import {getSpeedmeetServiceSpy} from '../../../testing/service-spies';

let speedmeetServiceSpy;
const expectedSpeedmeet = testData().speedmeet;

describe('CurrentSpeedmeetComponent', () => {
  let component: CurrentSpeedmeetComponent;
  let fixture: ComponentFixture<CurrentSpeedmeetComponent>;

  beforeEach(async(() => {
    speedmeetServiceSpy = getSpeedmeetServiceSpy(expectedSpeedmeet);

    TestBed.configureTestingModule({
      declarations: [ CurrentSpeedmeetComponent ],
      providers: [
        { provide: SpeedmeetService, useValue: speedmeetServiceSpy }
      ],
      imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentSpeedmeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load speedmeet', () => {
    expect(speedmeetServiceSpy.getLatestSpeedmeet.calls.count()).toEqual(1);
    expect(component.speedmeet).toEqual(expectedSpeedmeet);
  });

  it('should watch for changes', () => {
    expect(speedmeetServiceSpy.observeSpeedmeet.calls.count()).toEqual(1);
  });
});
