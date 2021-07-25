import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptDetailComponent } from './attempt-detail.component';

describe('AttemptDetailComponent', () => {
  let component: AttemptDetailComponent;
  let fixture: ComponentFixture<AttemptDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
