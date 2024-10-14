import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { SharedModule } from '../../theme/shared/shared.module';



@Component({
  selector: 'app-new-offer',
  standalone: true,
  imports: [FormsModule,CardComponent,SharedModule], // Ajoutez FormsModule ici
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss'] // Corrigez styleUrl en styleUrls
})
export class NewOfferComponent {
  offer = {
    title: '',
    description: '',
    category: '',
    budget: null,
    deadline: '',
    skills: ''
  };

  categories = ['Développement Web', 'Design', 'Rédaction', 'Marketing', 'Consultation'];
  submissionSuccess = false;

  onSubmit() {
    // Logique pour soumettre l'offre, par exemple :
    console.log('Offre soumise:', this.offer);

    // Réinitialiser le formulaire après la soumission
    this.offer = {
      title: '',
      description: '',
      category: '',
      budget: null,
      deadline: '',
      skills: ''
    };

    // Afficher un message de succès
    this.submissionSuccess = true;

    // Réinitialiser le message de succès après quelques secondes
    setTimeout(() => {
      this.submissionSuccess = false;
    }, 3000);
  }
}
