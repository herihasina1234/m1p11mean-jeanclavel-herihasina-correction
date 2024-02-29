import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from 'src/app/services/api/appointment_service/appointment.service';
import { PaymentService } from 'src/app/services/api/payment_service/payment.service';
import { Appointment } from 'src/app/models/Appointment';
import { Observable } from 'rxjs';
import { JWTTokenService } from 'src/app/services/token_service/jwt-token.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit {
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

  paymentStatus: boolean = true;
  status: boolean = true;
  keyword: string = '';

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

  onSearch(value: string){
    this.keyword = value;
    this.refreshAppointments();
  }  

  toggleAccordion(searchAccordion: any){
    searchAccordion.toggleItem();
    this.accordionIsVisible = !this.accordionIsVisible;
    this.refreshAppointments();
  }
  
  refreshAppointments(): void {
    let params:{ 
      customer_id?: string,
      status?: boolean, 
      paymentStatus?: boolean, 
      keyword?: string,
      page?: number,
      pageSize?: number
    } = { }
    
    if(!this.accordionIsVisible){
      params = { }
    }
    else{
      if(this.checkPayment) params.paymentStatus = this.paymentStatus 
      if(this.checkStatus) params.status = this.status 
      if(this.keyword !== '') params.keyword = this.keyword
    }
    params.page = this.currentPage
    params.pageSize = this.pageSize
    
    params.customer_id = this.userInfo.userId;

    this.appointmentService.getBySearchParams(params);
  }


  onPageChange(event: any): void {
    this.currentPage = event;
    this.refreshAppointments();
  }
  

  payer(appt: any){
    this.loading = true;
    const appointment = appt._id
    const amount = appt.service?.price
    
    this.paymentService.create({ appointment, amount })
      .subscribe({
        next: (response: any) =>  {     
          console.info(response.message);
          this.staticBackdropModal.visible = false;
          this.refreshAppointments();
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("save payment completed succesfully")
      })   
    
  }
}
