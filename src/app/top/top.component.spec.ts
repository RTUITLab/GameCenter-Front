import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOldComponent } from './top.component_old';

describe('TopOldComponent', () => {
  let component: TopOldComponent;
  let fixture: ComponentFixture<TopOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
