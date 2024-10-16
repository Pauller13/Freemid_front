import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';
import { Proposal } from 'src/app/domains/interfaces/proposal/proposal.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = 'http://localhost:8000/proposals/'; 

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getProposals(offerId: number): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.apiUrl}${offerId}/get-proposals`); // Adjust URL according to your API
  }
}