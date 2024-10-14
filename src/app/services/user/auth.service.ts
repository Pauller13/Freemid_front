import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<User> {
    return this.http.post(`${this.baseUrl}/token/`, credentials).pipe(
      tap((response: any) => {
        this.storeToken(response.access);
        localStorage.setItem('refresh_token', response.refresh);
        
        const userDetails = {
          username: response.username,
          first_name: response.first_name,
          last_name: response.last_name,
          id:response.user_id,
          role:response.role,
          photo:response.photo
        };

        localStorage.setItem('user_details', JSON.stringify(userDetails));
      }),
      catchError(error => {
        // Handle error appropriately
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  private storeToken(token: string) {
    localStorage.setItem('jwt_token', token);
    this.tokenSubject.next(token);
  }
  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_details'); 
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.tokenSubject.value !== null;
  }

  getUserDetails() {
    const userDetails = localStorage.getItem('user_details');
    return userDetails ? JSON.parse(userDetails) : null; 
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Refresh the access token
refreshToken(): Observable<any> {
  const refresh = localStorage.getItem('refresh_token');
  return this.http.post(`${this.baseUrl}/token/refresh/`, { refresh }).pipe(
    tap((response: any) => {
      this.storeToken(response.access);  // Update access token
    }),
    catchError(() => {
      this.logout();
      return throwError(() => new Error('Failed to refresh token'));
    })
  );
}

// Verify the token
verifyToken(token: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/token/verify/`, { token }).pipe(
    catchError(() => {
      return throwError(() => new Error('Token verification failed'));
    })
  );
}
}