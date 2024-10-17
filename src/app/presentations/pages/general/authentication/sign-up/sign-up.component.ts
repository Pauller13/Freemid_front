import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/domains/interfaces/user/user.interface';
import { UserService } from 'src/app/core/services/user/user.service';
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, ToastModule ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent implements OnInit {
  formUser!: FormGroup;
  userRole!: string | null

  constructor(private userService: UserService, private router: Router, private fbBuilderUser: FormBuilder, private messageService: MessageService) {}
  ngOnInit(): void {
    this.formUser = this.fbBuilderUser.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required,Validators.minLength(6)]],
    role: ['']
  })
    const token = localStorage.getItem('jwt_token');

    if (token){
      this.router.navigate(['/dashboard']);
    }
    this.userRole = localStorage.getItem('userRole'); // Récupération du rôle
    if (!this.userRole) {
      this.router.navigate(['/role']);
    }
  }
  submit() {
    console.log(this.formUser.value);
    
    if (this.validateForm()) {
      this.formUser.patchValue({ role: this.userRole });
      this.userService.register(this.formUser.value).subscribe(
        (data: User): void => {
          console.log('Formulaire soumis avec succès!', data);
          this.messageService.add({ severity: 'success', summary: 'Succes', detail: `Le compte de l'utilisateur ${data.username} creé avec succes`, life: 2000 });
          this.router.navigate(['/auth/signin']);
          localStorage.removeItem('userRole')
        },
        (error: any): void => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        },
        (): void => {
          this.formUser.reset();
        });
    }
  }

  validateForm(): boolean {
    if (this.formUser.value.password !== this.formUser.value.confirm_password) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Les mots de passe ne correspondent pas!'});
      return false;
    }
    return true;
  }
}
