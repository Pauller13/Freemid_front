export interface User {
    id?:number
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password?: string;
    confirm_password?: string;
    role?:string;
    photo?: string | File
  }

  