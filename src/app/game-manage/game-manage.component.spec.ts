import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameManageComponent } from './game-manage.component';

describe('GameManageComponent', () => {
  let component: GameManageComponent;
  let fixture: ComponentFixture<GameManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
