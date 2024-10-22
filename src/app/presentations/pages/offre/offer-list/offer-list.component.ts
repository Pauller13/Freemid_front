import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base/base.service';
import { ProposalService } from 'src/app/core/services/proposal/proposal.service';
import { Proposal } from 'src/app/domains/interfaces/proposal/proposal.interface';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


@Component({
  standalone: true,
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  imports: [
      CommonModule,
      ToastModule,
      ConfirmPopupModule,
      ButtonModule
  ],
  providers: [MessageService, ConfirmationService],


})
export class OfferListComponent implements OnInit {
  offers: Offer[]=[];
  selectedOffer!: Offer;
  selectedProposals!: Proposal[];
  filteredOffers: Offer[] = [];
  isSearching = false;
  paginatedOffers: Offer[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  confirm : boolean = false;

  constructor(
    private offerService: OfferService,
    private router: Router,
    private baseService: BaseService,
    private proposalService: ProposalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  
  confirmButton(event: Event, offerId?: number): void {
    if (offerId === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'ID de l\'offre non valide.' });
      return;
    }
  
    const target = event.target as EventTarget;
    this.confirmationService.confirm({
      target: target,
      message: 'Êtes-vous sûr de vouloir supprimer cette offre ?',
      accept: () => {
        this.onAccept(offerId);
      },
      reject: () => {
        this.onReject();
      },
      header: 'Confirmation',
    });
  }

  private onAccept(offerId: number): void {
    this.deleteOffer(offerId);
    this.messageService.add({ severity: 'success', summary: 'Sauvegarde', detail: 'Elève supprimé avec succès' });
  }

  private onReject(): void {
    this.messageService.add({ severity: 'error', summary: 'Annulation', detail: 'Suppression annulée' });
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getOffers().subscribe((data: Offer[]) => {
      console.log('Offres:', data);
      this.offers = data;
      this.filteredOffers = [...this.offers];
    },err=>{
      console.log(err);
    })

  }

  handleSearchChange(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.isSearching = true;

    // Filtrer les offres
    this.filteredOffers = this.offers.filter(offer =>
      offer.title.toLowerCase().includes(query) ||

      offer.description.toLowerCase().includes(query)
    );

    this.isSearching = false; // Fin de la recherche
  }


  getTimeRemaining(deadline: string): string {
    const now = new Date();
    const endDate = new Date(deadline);
    const timeDiff = endDate.getTime() - now.getTime();

    if (timeDiff < 0) {
      return 'Expiré';
    }

    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    return `${days} jour${days !== 1 ? 's' : ''} restant${days !== 1 ? 's' : ''}`;
  }


  // viewDetails(offerId?: number) {
  //   console.log(`Voir les détails de l'offre ID: ${offerId}`);
  // }

  updateOffer(offerId?: number): void {
    if (offerId) {
    this.baseService.setId(offerId.toString());
    console.log(offerId);
    this.router.navigate([`/offer-edit`]);
    }
  }
  deleteOffer(offerId?: number): void {
    if (offerId) {
      this.offerService.deleteOffer(offerId).subscribe(() => {
        this.loadOffers();
      })
    }
      
    }
    
  
  updatePaginatedOffers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOffers = this.offers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedOffers();
  }

  get totalPages(): number {
    return Math.ceil(this.offers.length / this.itemsPerPage);
  }
  showProposals(offerId?: number): void {
    if (offerId) {
    this.router.navigate([`/offer-proposals/${offerId}`]);
  }

  }

 
}
