import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelGameComponent } from './del-game.component';

describe('DelGameComponent', () => {
  let component: DelGameComponent;
  let fixture: ComponentFixture<DelGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
