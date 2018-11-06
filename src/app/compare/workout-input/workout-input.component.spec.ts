import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutInputComponent } from './workout-input.component';

describe('WorkoutInputComponent', () => {
  let component: WorkoutInputComponent;
  let fixture: ComponentFixture<WorkoutInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
