import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserServicePage } from './user-service.page';

describe('UserServicePage', () => {
  let component: UserServicePage;
  let fixture: ComponentFixture<UserServicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
