import { User } from "../user/user.interface";

export interface Freelancer{
    id?: number;
    user: User;  
    biography?: string;  
    skills: string[];  
    certificates: string[];  
    portfolio: object[];  
    rate_card: { [key: string]: any };
  }