import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('jwt_token');
    const userDetailsString = localStorage.getItem('user_details');
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
    const role = userDetails ? userDetails.role : null;

    if (!token) {
      console.log('Redirection vers la page de connexion (pas de token)');
      this.router.navigate(['/auth/signin']);
      return false;
    }

    return this.authService.verifyToken(token).pipe(
      switchMap(() => {
        const expectedRoles = route.data['roles'];
        if (expectedRoles && expectedRoles.includes(role)) {
          console.log('Access granted');
          return of(true);
        } else {
          this.handleRoleRedirect(role);
          return of(false);
        }
      }),
      catchError(() => {
        console.log('Token verification failed, attempting refresh');
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            const expectedRoles = route.data['roles'];
            if (expectedRoles && expectedRoles.includes(role)) {
              console.log('Access granted after refresh');
              return of(true);
            } else {
              this.handleRoleRedirect(role);
              return of(false);
            }
          }),
          catchError(() => {
            console.log('Refresh token failed, logging out and redirecting to login');
            this.authService.logout();
            this.router.navigate(['/auth/signin']);
            return of(false); 
          })
        );
      })
    );
  }

  private handleRoleRedirect(role: string | null) {
    if (role === 'freelancer') {
      console.log('Redirection vers le tableau de bord freelancer');
      this.router.navigate(['/dashboard-freelance']); 
    } else if (role === 'client') {
      console.log('Redirection vers le tableau de bord client');
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Redirection vers la page de connexion');
      this.router.navigate(['/auth/signin']); 
    }
  }
}
