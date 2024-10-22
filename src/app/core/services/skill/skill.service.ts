import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Skill } from 'src/app/domains/interfaces/offer/skill.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://localhost:8000/offers/'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) { }

  getSkillbyId(id: number | undefined): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}${id}`);
  }
    
}
