import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:8000/offers/'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<{ client_offers: Offer[] }>(this.apiUrl).pipe(
      map(response=> response.client_offers))
  
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}${id}/`);
  }

  updateOffer(offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}${offer.id}/`, offer);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
