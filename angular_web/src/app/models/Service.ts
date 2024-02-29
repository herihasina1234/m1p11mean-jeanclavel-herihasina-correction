export class Service {
    _id: string;
    designation: string;
    description?: string;
    price: number;
    duration: number;
    commission: number;
    img?: string | undefined;

  
    constructor() {
      this._id = '';
      this.designation = '';
      this.description = '';
      this.price = 0;
      this.duration = 0;
      this.commission = 0;
    }
  }
  