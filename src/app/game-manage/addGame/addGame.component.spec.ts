import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameComponent } from './addGame.component';

describe('DialogComponent', () => {
  let component: AddGameComponent;
  let fixture: ComponentFixture<AddGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
