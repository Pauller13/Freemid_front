import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFreemidComponent } from './header-freemid.component';

describe('HeaderFreemidComponent', () => {
  let component: HeaderFreemidComponent;
  let fixture: ComponentFixture<HeaderFreemidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderFreemidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderFreemidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
