// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/user/user.interface';
import { AuthService } from 'src/app/services/user/auth.service';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  user: Pick<User, 'username' | 'password'> = {
    username: '',
    password: '',
  }
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {

    const token = localStorage.getItem('jwt_token');

    if (token){
      this.router.navigate(['/dashboard']);
    }
  }

  connect() {
    const credentials = {
      username: this.user.username,
      password: this.user.password as string,
    };
  
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Erreur de connexion', error);
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    );
    
  }
}
