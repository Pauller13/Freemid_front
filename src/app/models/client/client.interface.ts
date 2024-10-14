import { User } from "../user/user.interface";
import { Information } from "./information.interface";




export interface Client{
    user : User;
    id?:number;
    company_description: string;
    additional_info: Information[];
}