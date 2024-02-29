import { Role } from './Role'


export class User {
    _id: string;
    name: string;
    firstname: string;
    email: string;
    password: string;
    role: Role | undefined;
    avatar: string | undefined;
  
    constructor() {
      this._id = '';
      this.name = '';
      this.firstname = '';
      this.email = '';
      this.password = '';
    }
  }
  