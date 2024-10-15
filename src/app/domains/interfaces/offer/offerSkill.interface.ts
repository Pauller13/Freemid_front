import { Offer } from "./offer.interface";
import { Skill } from "./skill.interface";

export interface OfferSkill {
    id?: number; 
    offer?: Offer; 
    skill: Skill; 
    level_required: string; 
  }
