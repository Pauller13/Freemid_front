import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Freelancer } from "src/app/domains/interfaces/Freelance/freelance.interface";

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private apiUrl = 'http://localhost:8000/freelancers/';

  constructor(private http: HttpClient) {}
  getFreelancers(): Observable<Freelancer[]> {
    return this.http.get<Freelancer[]>(`${this.apiUrl}`);
  }
  getFreelancerById(id: number): Observable<Freelancer> {
    return this.http.get<Freelancer>(`${this.apiUrl}${id}`);
  }

  getmyProfile(): Observable<Freelancer> {
    return this.http.get<Freelancer>(`${this.apiUrl}me/`);
  }

  updateFreelanceProfile(freelancer: Freelancer): Observable<any> {
    return this.http.put(`${this.apiUrl}me/`, freelancer);
  }

  changePassword(passwordData: { current_password: string; new_password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}change-password/`, passwordData);
  }
}