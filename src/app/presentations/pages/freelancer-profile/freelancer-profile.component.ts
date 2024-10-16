import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../theme/shared/shared.module';
import { FreelancerService } from 'src/app/core/services/freelance/freelance.service';
import { Freelancer } from 'src/app/domains/interfaces/Freelance/freelance.interface';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute,
    private freelancerService: FreelancerService
  ) {}

  ngOnInit(): void {
    this.loadFreelancerProfile();
  }

  loadFreelancerProfile(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    
    if (id) {
      this.freelancerService.getFreelancerById(Number(id)).subscribe(freelancer => {
        this.freelancer = freelancer;
      });
    }
  }
}