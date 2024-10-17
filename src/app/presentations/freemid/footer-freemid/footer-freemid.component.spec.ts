import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFreemidComponent } from './footer-freemid.component';

describe('FooterFreemidComponent', () => {
  let component: FooterFreemidComponent;
  let fixture: ComponentFixture<FooterFreemidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterFreemidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterFreemidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
