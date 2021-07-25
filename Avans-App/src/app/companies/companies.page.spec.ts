import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompaniesPage } from './companies.page';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {RouterTestingModule} from '@angular/router/testing';
import {CompanyListComponent} from './company-list/company-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CompaniesPage', () => {
  let component: CompaniesPage;
  let fixture: ComponentFixture<CompaniesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          CompaniesPage,
          CompanyListComponent
      ],
      imports: [
        IonicModule.forRoot(),
        CommonComponentsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompaniesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    done();
  });
});
