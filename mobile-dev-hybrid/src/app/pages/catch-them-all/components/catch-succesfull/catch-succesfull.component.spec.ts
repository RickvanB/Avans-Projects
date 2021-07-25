import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatchSuccesfullComponent } from './catch-succesfull.component';

describe('CatchSuccesfullComponent', () => {
  let component: CatchSuccesfullComponent;
  let fixture: ComponentFixture<CatchSuccesfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchSuccesfullComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatchSuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
