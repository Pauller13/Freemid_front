import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-offer',
  standalone: true,
  imports: [],
  templateUrl: './list-offer.component.html',
  styleUrl: './list-offer.component.scss'
})
export class ListOfferComponent implements OnInit {
  offers = [
    {
      title: 'Développement Web',
      description: "Création d'un site web responsive et optimisé pour le SEO.",
      price: '1.500.000 fcfa',
      date: '10/10/2024',
      image: 'path/to/image1.jpg',
      status: 'En cours'
    },
    {
      title: 'Rédaction de Contenu',
      description: "Rédaction d'articles SEO et de contenus marketing.",
      price: '600.000 fcfa',
      date: '12/10/2024',
      image: 'path/to/image2.jpg',
      status: 'Terminé'
    }
    // Ajoutez d'autres offres ici
  ];
  

  constructor() {}

  ngOnInit(): void {}
}
