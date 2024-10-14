import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/models/offer/offer.interface';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:8000/offers/'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  // Méthode pour créer une nouvelle offre
  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }

//   // Méthode pour récupérer toutes les offres
//   getOffers(): Observable<Offer[]> {
//     return this.http.get<Offer[]>(this.apiUrl);
//   }

//   // Méthode pour récupérer une offre par son ID
//   getOfferById(id: number): Observable<Offer> {
//     return this.http.get<Offer>(`${this.apiUrl}${id}/`);
//   }

//   // Méthode pour mettre à jour une offre
//   updateOffer(id: number, offer: Offer): Observable<Offer> {
//     return this.http.put<Offer>(`${this.apiUrl}${id}/`, offer);
//   }

//   // Méthode pour supprimer une offre
//   deleteOffer(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}${id}/`);
//   }
}
