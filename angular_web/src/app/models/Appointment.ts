import { User } from './User'
import { Service } from './Service'

export class Appointment {
    _id: string;
    customer: User | undefined;
    employee: User | undefined;
    service: Service | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    createdAt: Date | undefined;
    paymentStatus: boolean;
    status: boolean;
  
    constructor() {
      this._id = '';
      this.paymentStatus = false;
      this.status = false;
    }    
  }
  