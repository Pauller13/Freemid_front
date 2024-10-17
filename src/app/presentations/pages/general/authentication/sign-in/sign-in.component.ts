import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule, ReactiveFormsModule, ToastModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private fbUserBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fbUserBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
    localStorage.removeItem('userRole')
  }

  connect() {
    if (this.signInForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Veuillez renseigner tous les champs' });
    }
    else{

    const credentials = this.signInForm.value;

    this.authService.login(credentials).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Succes', detail: `Connection réussi`, life: 2000 });
        this.router.navigate(['/dashboard']);
      },
      (error) => {
       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Echec de connexion \n Veuillez vérifier vos identifiants' });
      }
    );
  }
}
}
