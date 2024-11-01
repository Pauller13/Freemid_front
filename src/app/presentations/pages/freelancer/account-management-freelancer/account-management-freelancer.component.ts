import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'src/app/presentations/theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { Freelancer } from 'src/app/domains/interfaces/Freelance/freelance.interface';
import { CommonModule } from '@angular/common';
import { FreelancerService } from 'src/app/core/services/freelance/freelance.service';
import { User } from 'src/app/domains/interfaces/user/user.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-management-freelancer',
  standalone: true,
  imports: [CardComponent, FormsModule, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, CommonModule, ToastModule],
  templateUrl: './account-management-freelancer.component.html',
  styleUrls: ['./account-management-freelancer.component.scss']
})
export class AccountManagementFreelancerComponent implements OnInit {
  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    photo: ''
  };
  showInfoModal = false;
  freelance: Freelancer = {
    user: {
      first_name: '',
      last_name: '',
      email: '',
      username: ''
    },
    skills: [],
    certificates: [],
    portfolio : [],
    rate_card: {},
    company_description: ''
  };
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordChangeError: string | null = null;
  profileUpdateError: string | null = null; // Pour gérer les erreurs de mise à jour du profil

  constructor(
    private freelancerService: FreelancerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.freelancerService.getmyProfile().subscribe(
      (data: Freelancer) => {
        this.freelance = data;
        console.log('freelance data:', this.freelance);
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.profileUpdateError = 'Erreur lors du chargement du profil.';
      }
    );
  }

  openInfoModal() {
    this.showInfoModal = true;
  }

  closeInfoModal() {
    this.showInfoModal = false;
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement; // Typage approprié
    const file = target.files?.[0]; // Optionnel, pour éviter l'erreur si aucun fichier n'est sélectionné
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.user.photo = e.target?.result as string; // Typage approprié
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.freelance.user.photo = this.user.photo;
    this.freelancerService.updateFreelanceProfile(this.freelance).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.profileUpdateError = error.error.detail || 'Erreur lors de la mise à jour du profil.'; // Affiche un message d'erreur
      }
    );
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordChangeError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const passwordData = {
      current_password: this.currentPassword,
      new_password: this.newPassword
    };

    this.freelancerService.changePassword(passwordData).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully' });
        this.passwordChangeError = null;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      (error) => {
        this.passwordChangeError = error.error.detail || 'Erreur lors du changement de mot de passe.';
        console.error('Password change error:', this.passwordChangeError);
      }
    );
  }
}
