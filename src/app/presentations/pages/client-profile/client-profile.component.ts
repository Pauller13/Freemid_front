import { Component } from '@angular/core';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/domains/interfaces/client/client.interface';
import { SharedModule } from '../../theme/shared/shared.module';
import { BaseService } from 'src/app/core/services/base/base.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent {
  client!: Client; 

  constructor(
    private clientService: ClientService,
    private baseService: BaseService

  ) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(): void {
    this.clientService.getClientById(Number(this.baseService.getId())).subscribe(clientData => {
      this.client = clientData;
    });
  }
}

