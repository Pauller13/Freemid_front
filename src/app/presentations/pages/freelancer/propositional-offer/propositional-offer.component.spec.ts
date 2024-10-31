import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionalOfferComponent } from './propositional-offer.component';

describe('PropositionalOfferComponent', () => {
  let component: PropositionalOfferComponent;
  let fixture: ComponentFixture<PropositionalOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropositionalOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
