import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapPage } from './map.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { testData } from 'src/testing/test-data';
import { getSpeedmeetServiceSpy } from 'src/testing/service-spies';
import { SpeedmeetService } from '../services/speedmeet.service';
import { CurrentSpeedmeetComponent } from '../common-components/current-speedmeet/current-speedmeet.component';

let speedmeetServiceSpy;
const expectedSpeedmeet = testData().speedmeet;

describe('MapPage', () => {
  let component: MapPage;
  let fixture: ComponentFixture<MapPage>;

  beforeEach(async(() => {
    speedmeetServiceSpy = getSpeedmeetServiceSpy(expectedSpeedmeet);
    TestBed.configureTestingModule({
      declarations: [ MapPage, CurrentSpeedmeetComponent ],
      providers: [
        { provide: SpeedmeetService, useValue: speedmeetServiceSpy }
      ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
