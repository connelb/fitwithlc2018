import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenicatedComponent } from './authenicated.component';

describe('AuthenicatedComponent', () => {
  let component: AuthenicatedComponent;
  let fixture: ComponentFixture<AuthenicatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenicatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
