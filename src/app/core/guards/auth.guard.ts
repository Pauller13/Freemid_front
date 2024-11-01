import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { Observable, of, Subscription, interval } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  private tokenCheckSubscription: Subscription | null = null;
  private intervalTime = 5 * 60 * 1000;

  constructor(private router: Router, private authService: AuthService) {
    this.startTokenCheck();
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = localStorage.getItem('jwt_token');
    const userDetails = this.getUserDetails();
    const role = userDetails.role;
    const expectedRoles = route.data['roles'];

    if (!token) {
      this.redirectToLogin('No token found');
      return of(false);
    }

    return this.authService.verifyToken(token).pipe(
      switchMap(() => this.checkAccess(expectedRoles, role)),
      catchError(() => this.handleTokenRefresh(expectedRoles, role))
    );
  }

  private getUserDetails() {
    const userDetailsString = localStorage.getItem('user_details');
    return JSON.parse(userDetailsString!);
  }

  private checkAccess(expectedRoles: string[], role: string): Observable<boolean> {
    if (expectedRoles && expectedRoles.includes(role)) {
      return of(true);
    } else {
      this.handleRoleRedirect(role);
      return of(false);
    }
  }

  private handleTokenRefresh(expectedRoles: string[], role: string): Observable<boolean> {
    console.log('Token verification failed, attempting refresh');
    return this.authService.refreshToken().pipe(
      switchMap(() => this.checkAccess(expectedRoles, role)),
      catchError(() => {
        this.authService.logout();
        this.router.navigate(['/auth/signin']);
        return of(false);
      })
    );
  }

  private startTokenCheck() {
    this.tokenCheckSubscription = interval(this.intervalTime).subscribe(() => {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        this.authService.verifyToken(token).pipe(
          catchError(() => this.authService.refreshToken())
        ).subscribe({
          error: () => {
            this.authService.logout();
            this.router.navigate(['/auth/signin']);
          }
        });
      }
    });
  }

  private handleRoleRedirect(role: string) {
    const redirectMap: { [key: string]: string } = {
      freelancer: '/dashboard-freelance',
      client: '/dashboard'
    };
    const redirectRoute = redirectMap[role] || '/auth/signin';
    console.log(`Redirecting to ${redirectRoute}`);
    this.router.navigate([redirectRoute]);
  }

  private redirectToLogin(message: string) {
    console.log(message);
    this.router.navigate(['/auth/signin']);
  }

  ngOnDestroy() {
    this.tokenCheckSubscription?.unsubscribe();
  }
}
