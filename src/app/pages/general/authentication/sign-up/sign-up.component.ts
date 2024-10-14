import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/user/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent implements OnInit {
  newUser: User= {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    role: '',
  };
  roles = ['Client', 'Freelancer'];
  
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('jwt_token');

    if (token){
      this.router.navigate(['/dashboard']);
    }
  }
  submit() {
    if (this.validateForm()) {
      this.newUser.role = this.newUser.role?.toLowerCase();
      this.userService.register(this.newUser).subscribe((data) => {
        console.log('Formulaire soumis avec succès!', data);
        this.router.navigate(['/auth/signin']);
      })
     
    }
  }

  validateForm(): boolean {
    if (this.newUser.password !== this.newUser.confirm_password) {
      alert('Les mots de passe ne correspondent pas!');
      return false;
    }
    return true;
  }
}
