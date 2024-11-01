import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
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
export class OfferEditComponent implements OnInit {
  offer!: Offer;
  currentPage: number = 1;

  constructor(
    private offerService: OfferService,
    private router: Router,
    private messageService: MessageService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    const id = this.baseService.getId();
    this.offerService.getOfferById(Number(id)).subscribe(
      (data: Offer) => {
        this.offer = data;
        if (!this.offer.required_skills) {
          this.offer.required_skills = [];
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération de l\'offre' });
        this.router.navigate(['/offers-list']);
      }
    );
  }

  updateOffer(): void {
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

  addSkill() {
    const newSkill: OfferSkill = { skill: { name: '' }, level_required: '' };
    if (!this.offer.required_skills) {
      this.offer.required_skills = [];
    }
    this.offer.required_skills.push(newSkill);
  }

  removeSkill(index: number) {
    if (this.offer.required_skills && index >= 0 && index < this.offer.required_skills.length) {
      this.offer.required_skills.splice(index, 1);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  onDeadlineChange(event: any) {
    this.offer.deadline = event;
  }
}
