import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyBannerComponent } from './company-banner.component';
import {CompanyService} from '../../services/company.service';
import {getCompanyServiceSpy} from '../../../testing/service-spies';
import {testData} from '../../../testing/test-data';

describe('CompanyBannerComponent', () => {
  let component: CompanyBannerComponent;
  let fixture: ComponentFixture<CompanyBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBannerComponent ],
      providers: [
        { provide: CompanyService, useValue: getCompanyServiceSpy(testData().companies) }
      ],
      imports: [
          IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
