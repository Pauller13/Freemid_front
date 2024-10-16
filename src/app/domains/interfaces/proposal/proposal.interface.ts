import { Freelancer } from "../Freelance/freelance.interface";
import { Offer } from "../offer/offer.interface";

export interface Proposal {
    id: number;
    freelancer: {
        id: number;
        user: {
            first_name: string;
            last_name: string;
        };
    };
    offer: Offer;
    proposed_budget: number;
    proposed_deadline: string; 
    message: string;
    is_accepted: boolean;
  }