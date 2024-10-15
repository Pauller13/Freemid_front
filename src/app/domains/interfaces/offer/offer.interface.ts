import { Client } from "../client/client.interface";
import { OfferSkill } from "./offerSkill.interface";

export interface Offer {
    id?: number; 
    client?: Client; 
    title: string;
    description: string;
    required_skills: OfferSkill[]; 
    budget: number; 
    deadline: string; 
  }