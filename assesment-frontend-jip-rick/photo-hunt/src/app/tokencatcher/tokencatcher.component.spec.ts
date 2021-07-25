import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokencatcherComponent } from './tokencatcher.component';

describe('TokencatcherComponent', () => {
  let component: TokencatcherComponent;
  let fixture: ComponentFixture<TokencatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokencatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokencatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
