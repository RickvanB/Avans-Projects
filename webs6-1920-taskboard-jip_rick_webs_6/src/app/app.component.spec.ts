import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { getAuthServivceServiceSpy } from './testing/service-spies';
import { testdata } from './testing/test-data';
import { AuthService } from './services/auth/auth.service';
import { NavigationComponent } from './components/public/navigation/navigation.component';

let authServiceSpy;

describe('AppComponent', () => {
  beforeEach(async(() => {

    authServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavigationComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'taskboard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('taskboard');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('taskboard app is running!');
  // });
});
