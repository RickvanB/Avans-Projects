import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypesPage } from './types.page';

describe('TypesPage', () => {
  let component: TypesPage;
  let fixture: ComponentFixture<TypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
