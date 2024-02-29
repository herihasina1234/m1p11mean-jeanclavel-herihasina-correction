export class Service {
    _id: string;
    designation: string;
    description: string;
    duration: number;
    price: number;
    commission: number;
    img: string | undefined;
  
    constructor() {
      this._id = '';
      this.designation = '';
      this.description = '';
      this.duration = 0;
      this.price = 0;
      this.commission = 0;
      }
  }
  