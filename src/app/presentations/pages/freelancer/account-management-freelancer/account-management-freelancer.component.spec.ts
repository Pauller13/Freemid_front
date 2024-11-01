import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementFreelancerComponent } from './account-management-freelancer.component';

describe('AccountManagementFreelancerComponent', () => {
  let component: AccountManagementFreelancerComponent;
  let fixture: ComponentFixture<AccountManagementFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountManagementFreelancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountManagementFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
