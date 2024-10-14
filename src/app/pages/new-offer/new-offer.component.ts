import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { Offer } from 'src/app/models/offer/offer.interface';
import { OfferSkill } from 'src/app/models/offer/offerSkill.interface';
import { OfferService } from 'src/app/services/offer/offer.service';

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

  constructor(private offerService: OfferService) {}

  addSkill() {
    const skill: OfferSkill = { skill:{
      name: ''
    }, level_required: '' };
    this.offer.required_skills.push(skill);
  }

  removeSkill(index: number) {
    this.offer.required_skills.splice(index, 1);
  }

  onSubmit() {
    console.log('Offre soumise:', this.offer);
    this.offerService.createOffer(this.offer).subscribe(
      (response) => {
        console.log('Offre créée avec succès:', response);
        this.submissionSuccess = true;

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
