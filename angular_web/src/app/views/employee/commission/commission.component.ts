import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/api/appointment_service/appointment.service';
import { PaymentService } from 'src/app/services/api/payment_service/payment.service';
import { JWTTokenService } from 'src/app/services/token_service/jwt-token.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.scss'
})
export class CommissionComponent implements OnInit {
  //autoRefresh variable
  private intervalId?: number;
  
  appointments$: Observable<Appointment[]> = this.appointmentService.dataList$;  
  totalPages$: Observable<number> = this.appointmentService.totalPages$;
  paginationTable$: Observable<number[]> = this.appointmentService.paginationTable$;

  //ui variable
  loading: boolean = false;
  @ViewChild('staticBackdropModal') staticBackdropModal: any; // ViewChild to access the modal
  userInfo: any;
  //ui searchbar variable

  accordionIsVisible: boolean = false;
  checkPayment: boolean = true;
  checkStatus: boolean = true;
  items = [1, 2, 3, 4];
  
  //searchbar variable

  dateTime: Date = new Date();

  //pagination variable

  currentPage: number = 1;
  pageSize: number = 2;
  totalItems: number = 0;
  

  constructor(
    private appointmentService: AppointmentService,
    private paymentService: PaymentService,
    private tokenService: JWTTokenService
  ){
  }
  
  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.refreshAppointments();
    }, 100000);
    this.userInfo = this.tokenService.getDecodeToken();
  }

  ngOnDestroy(): void {
    if(this.intervalId)
      clearInterval(this.intervalId);    
  }



  getCommission(dateTime:any){
    console.log(dateTime);
    this.dateTime = dateTime;
    this.refreshAppointments()
  }
  
  refreshAppointments(): void {
    let params:{ 
      employee_id?: string,      
      dateTime?: Date
    } = { }      
    
    params.employee_id = this.userInfo.userId;
    params.dateTime = this.dateTime;

    this.appointmentService.getCommission(params);
  }
   
}

