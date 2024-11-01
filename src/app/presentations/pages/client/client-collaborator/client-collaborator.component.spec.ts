import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCollaboratorComponent } from './client-collaborator.component';

describe('ClientCollaboratorComponent', () => {
  let component: ClientCollaboratorComponent;
  let fixture: ComponentFixture<ClientCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCollaboratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
