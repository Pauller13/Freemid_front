import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {

  constructor(private router: Router){

  }

  selectRole(role: string) {
    localStorage.setItem('userRole', role);
    this.router.navigate(['auth/signup']);
  }

}
