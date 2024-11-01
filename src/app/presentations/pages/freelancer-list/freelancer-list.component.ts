import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/core/services/freelance/freelance.service';
import { Freelancer } from 'src/app/domains/interfaces/Freelance/freelance.interface';
import { SharedModule } from '../../theme/shared/shared.module';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base/base.service';

@Component({
  standalone: true,
  selector: 'app-freelancer-list',
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss'],
  imports: [SharedModule],
})
export class FreelancerListComponent implements OnInit {


  freelancers: Freelancer[] = [];
  filteredFreelancers: Freelancer[] = [];
  isSearching = false;
  searchTerm: string = '';

  constructor(private freelancerService: FreelancerService, private router: Router, private baseService: BaseService) {}

  ngOnInit(): void {
    this.loadFreelancers();
  }

  loadFreelancers(): void {
    this.freelancerService.getFreelancers().subscribe({
      next: (data) => {
        this.freelancers = data;
        console.log('Freelancers:', this.freelancers);
        this.filteredFreelancers = [...this.freelancers];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des freelancers', err);
      }
    });
  }

  handleSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.isSearching = true;

    this.filteredFreelancers = this.freelancers.filter(freelancer =>
      `${freelancer.user.first_name} ${freelancer.user.last_name}`
        .toLowerCase()
        .includes(query)
    );

    this.isSearching = false;
  }
  
  viewProfile(freelancerId?: number): void {
    if (freelancerId) {
      const freelancer = this.freelancers.find(f => f.id === freelancerId);
      if (freelancer) {
        const freelancerName = encodeURIComponent(`${freelancer.user.first_name} ${freelancer.user.last_name}`);
        this.baseService.setId(freelancerId.toString());
        this.router.navigate([`/freelancer-profile/${freelancerName}`]);
      }
    }
  }
  sendMessage(arg0: number|undefined) {
    throw new Error('Method not implemented.');
    }
}