import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/core/services/freelance/freelance.service';
import { Freelancer } from 'src/app/domains/interfaces/Freelance/freelance.interface';
import { SharedModule } from '../../theme/shared/shared.module';
import { Router } from '@angular/router';

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

  constructor(private freelancerService: FreelancerService, private router: Router) {}

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
  
  viewProfile(freelancerId: number |undefined): void {
    console.log('ID:', freelancerId);
    if (freelancerId) {
      console.log(freelancerId);
      this.router.navigate([`/freelancer-profile/${freelancerId}`]);
    }
  }
  sendMessage(arg0: number|undefined) {
    throw new Error('Method not implemented.');
    }
}