import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';
import { OfferSkill } from 'src/app/domains/interfaces/offer/offerSkill.interface';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [FormsModule, CardComponent, SharedModule],
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss']
})
export class NewOfferComponent {
  offer: Offer = {
    title: '',
    description: '',
    budget: 0,
    deadline: '',
    required_skills: []
  };

  categories = ['Développement Web', 'Design', 'Rédaction', 'Marketing', 'Consultation'];
  submissionSuccess = false;
  currentPage: number =1;

  constructor(private offerService: OfferService, private router: Router) {}

  addSkill() {
    const skill: OfferSkill = { skill:{
      name: ''
    }, level_required: '' };
    this.offer.required_skills.push(skill);
  }

  removeSkill(index: number) {
    this.offer.required_skills.splice(index, 1);
  }

  goToPage(page: number) {
    this.currentPage = page; 
    console.log(this.offer);
  }

  onSubmit() {
    console.log('Offre soumise:', this.offer);
    this.offerService.createOffer(this.offer).subscribe(
      (response) => {
        console.log('Offre créée avec succès:', response);
        this.submissionSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);

        // Réinitialiser le formulaire après la soumission
        this.offer = {
          title: '',
          description: '',
          budget: 0,
          deadline: '',
          required_skills: []
        };
      },
      (error) => {
        console.error('Erreur lors de la création de l\'offre:', error);
      }
    );

    // Réinitialiser le message de succès après quelques secondes
    setTimeout(() => {
      this.submissionSuccess = false;
    }, 3000);
  }
}
