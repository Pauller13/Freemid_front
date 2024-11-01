import { Component } from '@angular/core';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/domains/interfaces/client/client.interface';
import { SharedModule } from '../../theme/shared/shared.module';

@Component({
  selector: 'app-my-profil-client',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './my-profil-client.component.html',
  styleUrl: './my-profil-client.component.scss'
})
export class MyProfilClientComponent {
  client!: Client; 

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(): void {
    this.clientService.getmyProfile().subscribe(
      (data:Client) => {
      this.client = data;
    });
  }
}
