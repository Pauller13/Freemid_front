import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { SkillService } from 'src/app/core/services/skill/skill.service';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';
import { OfferSkill } from 'src/app/domains/interfaces/offer/offerSkill.interface';
import { BaseService } from 'src/app/core/services/base/base.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';
import { forkJoin } from 'rxjs';

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
    private skillService: SkillService,
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
        this.loadSkills();
      },
      (error) => {
        console.error('Error fetching offer:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération de l\'offre' });
      }
    );
  }

  loadSkills() {
    if (this.offer.required_skills && Array.isArray(this.offer.required_skills)) {
      const skillObservables = this.offer.required_skills.map(skill =>
        this.skillService.getSkillbyId(skill.skill.id) // Assuming skill has an 'id' property
      );

      forkJoin(skillObservables).subscribe(
        (skills) => {
          this.offer.required_skills = skills.map((skill, index) => ({
            skill: { name: skill.name },
            level_required: this.offer.required_skills[index].level_required
          }));
        },
        (error) => {
          console.error('Error fetching skills:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des compétences' });
        }
      );
    } else {
      this.offer.required_skills = [];
    }
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
    this.offer.required_skills.push(newSkill);
  }

  removeSkill(index: number) {
    this.offer.required_skills.splice(index, 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  onDeadlineChange(event: any) {
    this.offer.deadline = event;
  }
}