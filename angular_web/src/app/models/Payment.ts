import { Appointment } from './Appointment'

export class Payment {
    _id: string;
    appointment: Appointment | undefined;
    amount: number;
    paymentDate: string;
  
    constructor() {
      this._id = '';
      this.amount = 0;
      this.paymentDate = '';      
    }    
  }
  