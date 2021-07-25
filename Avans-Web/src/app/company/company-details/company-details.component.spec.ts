import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsComponent } from './company-details.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { getCompanyServiceSpy } from '../../../testing/serviceSpies';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute } from '@angular/router';

let activatedRouteStub: ActivatedRouteStub;
let companiesServiceSpy;

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;

  beforeEach(async(() => {
    companiesServiceSpy = getCompanyServiceSpy();
    activatedRouteStub = new ActivatedRouteStub({ id: 1});

    TestBed.configureTestingModule({
      declarations: [ CompanyDetailsComponent ],
      imports: [
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        { provide: CompaniesService, useValue: companiesServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
