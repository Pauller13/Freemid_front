import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/core/services/offer/offer.service';
import { Offer } from 'src/app/domains/interfaces/offer/offer.interface';

@Component({
  selector: 'app-list-offer',
  standalone: true,
  imports: [],
  templateUrl: './list-offer.component.html',
  styleUrl: './list-offer.component.scss'
})
export class ListOfferComponent implements OnInit {
  offers!: Offer[];


  constructor(
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getmyOffers().subscribe(offers => {
      this.offers = offers;
      console.log(this.offers);
    });
  }
}
