import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { FreelancerService } from 'src/app/core/services/freelance/freelance.service';
import { Freelancer } from 'src/app/domains/interfaces/Freelance/freelance.interface';
import { CommonModule } from '@angular/common';
import { BaseService } from 'src/app/core/services/base/base.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.scss'
})
export class FreelancerProfileComponent implements OnInit {
  freelancer!: Freelancer;

  constructor(
    private freelancerService: FreelancerService,
    private baseService: BaseService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loadFreelancerProfile();
  }

  loadFreelancerProfile(): void {
    const id = this.baseService.getId();
    if (id) {
      this.freelancerService.getFreelancerById(Number(id)).subscribe(
        (data: Freelancer) => {
        this.freelancer = data;
      }
  );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Avertissement', detail: 'Erreur lors de la sélection du profil' });
      this.router.navigate(['/freelancer-list']);
    }
  }
  
}