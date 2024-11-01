import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { ProposalService } from 'src/app/core/services/proposal/proposal.service';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';
import { Proposal } from 'src/app/domains/interfaces/proposal/proposal.interface';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';
import { FreelancerService } from 'src/app/core/services/freelance/freelance.service';
import { BaseService } from 'src/app/core/services/base/base.service';
import { Freelancer } from 'src/app/domains/interfaces/Freelance/freelance.interface';
@Component({
  selector: 'app-detail-offer',
  standalone: true,
  imports: [TableModule, InputTextModule, SharedModule, RouterModule],
  templateUrl: './detail-offer.component.html',
  styleUrl: './detail-offer.component.scss'
})
export class DetailOfferComponent implements OnInit {


  offer!: Offer;
  proposals: Proposal[] = [];
  filteredProposals: Proposal[] = [];
  offerId!: number;
  searchTerm: string = '';
  freelancers: Freelancer[] = [];
  freelancerService = inject(FreelancerService);
  freelanceService = this.freelancerService.getFreelancers();

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private proposalService: ProposalService,
    private router: Router,
    private baseService: BaseService
  ) {
    this.offerId = Number(this.baseService.getId());
  }

  ngOnInit(): void {

      this.loadOfferDetails();
      this.loadProposals();


  }

  loadOfferDetails(): void {
    this.offerService.getOffers().subscribe((offers: Offer[]) => {
      this.offer = offers.find(o => o.id === this.offerId)!;
    });
  }

  loadProposals(): void {
    if (!this.offerId) {
      return;
    }
    this.proposalService.getProposals(this.offerId).subscribe({
      next: (data) => {
        this.proposals = data;
        this.filteredProposals = [...this.proposals];
        console.log(this.proposals);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des propositions', err);
      }
    });
  }

  filterProposals(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProposals = this.proposals.filter(proposal =>
      proposal.freelancer.user.first_name.toLowerCase().includes(query) ||
      proposal.freelancer.user.last_name.toLowerCase().includes(query) ||
      proposal.message.toLowerCase().includes(query)
    );
  }

  viewFreelancerProfile(freelancerId: Number) {

    this.freelanceService.subscribe(
      data => {
        this.freelancers = data;
      }
    )
    if (freelancerId) {
      const freelancer = this.freelancers.find(f => f.id === freelancerId);
      if (freelancer) {
        const freelancerName = encodeURIComponent(`${freelancer.user.first_name} ${freelancer.user.last_name}`);
        this.baseService.setId(freelancerId.toString());
        this.router.navigate([`freelancer-profile/${freelancerName}`]);
      }
    }
  }

}
