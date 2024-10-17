import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFreelanceComponent } from './dashboard-freelance.component';

describe('DashboardFreelanceComponent', () => {
  let component: DashboardFreelanceComponent;
  let fixture: ComponentFixture<DashboardFreelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFreelanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
