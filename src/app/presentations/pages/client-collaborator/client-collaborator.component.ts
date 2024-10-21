import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Définition des interfaces pour structurer les données
interface User {
  first_name: string;
  last_name: string;
  photo: string;
  skills: string[];
}

interface Freelancer {
  id: number;
  user: User;
}

@Component({
  selector: 'app-client-collaborator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-collaborator.component.html',
  styleUrls: ['./client-collaborator.component.scss']
})
export class ClientCollaboratorComponent {
  freelancers: Freelancer[] = [
    // Exemple de données pour les freelancers
    { id: 1, user: { first_name: 'Paul', last_name: 'Ekra', photo: '', skills: ['Angular', 'TypeScript', 'CSS'] } },
    { id: 2, user: { first_name: 'Idrissa', last_name: 'Silué', photo: '', skills: ['JavaScript', 'HTML', 'React'] } }
  ];
  filteredFreelancers: Freelancer[] = this.freelancers;
  isSearching: boolean = false; // Indicateur de recherche

  constructor() {
    // Initialisation des données si nécessaire
    this.filteredFreelancers = this.freelancers; // Par défaut, tous les freelances sont affichés
  }

  filterFreelancers(event: any): void {
    const query = event.target.value.toLowerCase();
    this.isSearching = true; // Activer l'indicateur de recherche

    this.filteredFreelancers = this.freelancers.filter(freelancer =>
      `${freelancer.user.first_name} ${freelancer.user.last_name}`.toLowerCase().includes(query) ||
      freelancer.user.skills.some((skill: string) => skill.toLowerCase().includes(query))
    );

    this.isSearching = false; // Désactiver l'indicateur de recherche après le filtrage
  }

  // Méthode pour afficher le profil du freelance
  viewProfile(freelancerId: number): void {
    console.log(`Afficher le profil du freelancer avec l'ID : ${freelancerId}`);
    // Implémentez ici la logique pour afficher le profil du freelance (par exemple, navigation vers une autre page)
  }

  // Méthode pour envoyer un message au freelance
  sendMessage(freelancerId: number): void {
    console.log(`Message envoyé au freelancer avec l'ID : ${freelancerId}`);
    // Implémentez ici la logique pour envoyer un message au freelancer
  }
}
