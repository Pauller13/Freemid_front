import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
    token: string | null;
    userDetails: any | null;
    role: string | null;
  
    constructor(private router: Router) {
      this.token = localStorage.getItem('jwt_token');
      const userDetailsString = localStorage.getItem('user_details');
      this.userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
      this.role = this.userDetails ? this.userDetails.role : null;
    }
  
    goToHome() {
      console.log(this.token);
      if (this.token) {
        if (this.role === 'freelancer') {
          this.router.navigate(['/dashboard-freelance']);
        } else if (this.role === 'client') {
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.router.navigate(['/freemid']);
      }
    }
  
}
