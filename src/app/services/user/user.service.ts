import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user.interface';


const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable({
  providedIn: 'root'
})

export class UserService {
    

  private apiUrl = 'http://localhost:8000/users';  

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<any>(this.apiUrl+'/', user, { headers });
  }
  

}
