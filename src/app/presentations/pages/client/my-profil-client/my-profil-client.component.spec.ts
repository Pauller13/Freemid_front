import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilClientComponent } from './my-profil-client.component';

describe('MyProfilClientComponent', () => {
  let component: MyProfilClientComponent;
  let fixture: ComponentFixture<MyProfilClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfilClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfilClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
