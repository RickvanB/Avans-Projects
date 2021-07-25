import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovesPage } from './moves.page';

describe('MovesPage', () => {
  let component: MovesPage;
  let fixture: ComponentFixture<MovesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
