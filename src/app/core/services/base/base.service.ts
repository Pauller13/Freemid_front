import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private id!: string;

  constructor() { }


  setId(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
}
