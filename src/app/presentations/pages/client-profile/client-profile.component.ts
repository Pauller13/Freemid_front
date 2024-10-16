import { Component } from '@angular/core';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/domains/interfaces/client/client.interface';
import { SharedModule } from '../../theme/shared/shared.module';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent {
  client!: Client; 

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(): void {
    this.clientService.getmyProfile().subscribe(clientData => {
      this.client = clientData;
    });
  }
}

