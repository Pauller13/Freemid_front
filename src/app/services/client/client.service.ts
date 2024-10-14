import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8000/clients';
  constructor(private http: HttpClient) {}

  getmyProfile(): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/my-profile/`);
  }

  updateClientProfile(client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.baseUrl}/update-profile/`, client); 
  }
  changePassword(passwordData: { current_password: string, new_password: string }): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update-password/`, passwordData);
  }
}