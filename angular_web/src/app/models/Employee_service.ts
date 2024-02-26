import { User } from './User';
import { Service } from './Service';
export class Employeeservice {
    _id: string;
    service: Service | null;
    employee: User | null;
  
    constructor() {
      this._id = '';
      this.employee = null;
      this.service = null;
    }
  }
  