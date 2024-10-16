import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';
import { OfferSkill } from 'src/app/domains/interfaces/offer/offerSkill.interface';
import { BaseService } from 'src/app/core/services/base/base.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';

@Component({
  selector: 'app-offer-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss']
})
export class OfferEditComponent implements OnInit{
  offer!: Offer;
  currentPage: number = 1;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    const id = this.baseService.getId();
    this.offerService.getOfferById(Number(id)).subscribe(
      (data: Offer) => {
        this.offer = data;
      },
    );
  }

  updateOffer(): void {
    if (this.offer) {
      this.offerService.updateOffer(this.offer).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Offre modifiée avec succès' });
          this.router.navigate(['/offers-list']);
        },
        error: (error) => {
          console.error('Error updating offer:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de l\'offre' });
        }
      });
    }
  }

  addSkill() {
    const skill: OfferSkill = { skill: { name: '' }, level_required: '' };
    this.offer?.required_skills.push(skill);
  }

  removeSkill(index: number) {
    this.offer?.required_skills.splice(index, 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    console.log(this.offer);
  }

  onDeadlineChange(event: any) {
    this.offer!.deadline = event; // Update the offer's deadline based on the input change
    console.log('Deadline updated:', this.offer.deadline);
  }
}