import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/domains/interfaces/client/client.interface';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/core/services/client/client.service';
import { User } from 'src/app/domains/interfaces/user/user.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [CardComponent, FormsModule, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, CommonModule, ToastModule],
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent implements OnInit {

  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    photo: '',
  };
  showInfoModal = false;
  client: Client = {
    user: this.user,
    company_description: '',
    additional_info: [{ name: '', description: '' }],
  };
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordChangeError: string | null = null;

  constructor(private clientService: ClientService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.clientService.getmyProfile().subscribe((data: Client) => {
      this.client = data;
      console.log("Client data:", this.client);
    });
  }

  openInfoModal() {
    console.log('Open Info Modal');
    this.showInfoModal = true;
    console.log(this.showInfoModal);
  }

  closeInfoModal() {
    this.showInfoModal = false;
  }
  addInfo() {
    this.client.additional_info.push({ name: '', description: '' });
  }

  removeInfo(index: number) {
    this.client.additional_info.splice(index, 1);
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.photo = e.target.result; // contient 'data:image/png;base64,...'
        console.log('Photo en base64:', this.user.photo);
      };
      reader.readAsDataURL(file);
    }
  }
  
  
 
  onSubmit() {
    this.client.user.photo = this.user.photo; 
    console.log('User Data Photo:', this.client.user.photo);
    console.log('Client Data Submitted:', this.client);
    
    this.clientService.updateClientProfile(this.client).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
    }, error => {
      console.error('Error updating profile:', error);
    });
  }
  
  
changePassword() {
  if (this.newPassword !== this.confirmPassword) {
    this.passwordChangeError = 'Les mots de passe ne correspondent pas.';
    return;
  }

  const passwordData = {
    current_password: this.currentPassword,
    new_password: this.newPassword,
  };

  this.clientService.changePassword(passwordData).subscribe(
    (response: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully' });
      // console.log('Password changed successfully:', response);
      this.passwordChangeError = null; // Clear any previous error
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    (error: { error: { detail: string; }; }) => {
      this.passwordChangeError = error.error.detail || 'Erreur lors du changement de mot de passe.';
      console.error('Password change error:', this.passwordChangeError);
    }
  );
}


}