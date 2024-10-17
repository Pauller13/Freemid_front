import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreemidComponent } from './freemid.component';

describe('FreemidComponent', () => {
  let component: FreemidComponent;
  let fixture: ComponentFixture<FreemidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreemidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreemidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
