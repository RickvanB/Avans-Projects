import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatchThemAllPage } from './catch-them-all.page';

describe('CatchThemAllPage', () => {
  let component: CatchThemAllPage;
  let fixture: ComponentFixture<CatchThemAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchThemAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatchThemAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
