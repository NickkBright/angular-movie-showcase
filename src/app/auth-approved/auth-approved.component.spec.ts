import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthApprovedComponent } from './auth-approved.component';

describe('AuthApprovedComponent', () => {
  let component: AuthApprovedComponent;
  let fixture: ComponentFixture<AuthApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
