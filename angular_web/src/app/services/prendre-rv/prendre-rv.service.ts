import { Injectable } from '@angular/core';
import { BehaviorSubject, map, takeUntil } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { Service } from 'src/app/models/Service';
import { AppointmentService } from 'src/app/services/api/appointment_service/appointment.service'
import { JWTTokenService } from '../token_service/jwt-token.service';
import { DateService } from '../date/date.service';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class PrendreRvService {
  private cartAppointmentSubject: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);
  private durationTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private priceTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  public cartAppointments$ = this.cartAppointmentSubject.asObservable();
  public durationTotal$ = this.durationTotalSubject.asObservable();
  public priceTotal$ = this.priceTotalSubject.asObservable();
  
  
  constructor(
    private appointmentService: AppointmentService,
    private tokenService: JWTTokenService,
    private dateService: DateService
  ) { }

  
  addToCart(service: Service) {
    const currentProducts = [...this.cartAppointmentSubject.getValue()];
    const existingProductIndex = currentProducts.findIndex(
      (p) => p.service?._id === service._id
    );

    let appointment = new Appointment();
    appointment.service = service;   
    appointment.customer = this.tokenService.user;    
    if (existingProductIndex < 0) {      
      // If the product doesn't exist in the cart, add it with quantity = 1
      this.cartAppointmentSubject.next([
        ...currentProducts,
        { ...appointment },
      ]);
    } 

    console.log(service)
  }


  updateEmploye(employe: User, index: number){    
    const currentValue = this.cartAppointmentSubject.getValue();
    currentValue[index].employee = employe;
    this.cartAppointmentSubject.next(currentValue);  
  }
  
  
  updateDate(dateTime: string, index: number){
    console.log(dateTime)
    const currentValue = this.cartAppointmentSubject.getValue(); 
    
    // Create a new Date object
    currentValue[index].startDate = this.dateService.strToDate(dateTime);
    currentValue[index].endDate = this.dateService.strToDate(dateTime);    
    
    if(currentValue){
      const duration = currentValue[index]?.service?.duration
      const minute = currentValue[index]?.endDate 

      if(duration && minute){
        currentValue[index].endDate?.setMinutes(
          duration + minute.getMinutes()
        )     
      }

    }

    this.cartAppointmentSubject.next(currentValue);  
  }


  removeFromCart(index: number) {
    const currentProducts = this.cartAppointmentSubject.getValue();
    currentProducts.splice(index, 1);
    this.cartAppointmentSubject.next(currentProducts);
  }

  
  makeDateLinked(){
    const currentProducts = this.cartAppointmentSubject.getValue();
    for (let index = 1; index < currentProducts.length; index++){
      let temp = currentProducts[index - 1]  
      if(temp.endDate){                            
         this.updateDate(this.dateService.reformat(temp.endDate), index);
      }
        
      }           
      
    this.cartAppointmentSubject.next(currentProducts);
  }


  calculDuration(){
    const currentProducts = this.cartAppointmentSubject.getValue();
    let total = 0;
    for (let index = 0; index < currentProducts.length; index++) {      
      let duration = currentProducts[index].service?.duration;
      if(duration)
        total = total + duration
      
    }            
        
    this.durationTotalSubject.next(total)
  }
  
  
  calculPrice(){
    const currentProducts = this.cartAppointmentSubject.getValue();
    let total = 0;
    for (let index = 0; index < currentProducts.length; index++) {      
      let price = currentProducts[index].service?.price;
      if(price)
        total = total + price
      
    }            
        
    this.priceTotalSubject.next(total)
  }
  
  
  save(){
    let boolState = undefined
    const appointments = [...this.cartAppointmentSubject.getValue()];
    
    let isCorrect = false;
    for (let index = 0; index < appointments.length; index++) {
      const appointment = appointments[index];
      if(appointment.startDate && appointment.endDate && appointment.employee?._id)
        isCorrect = true;
      
    }

    if(isCorrect){
      this.appointmentService.createMany(appointments)
        .subscribe({
          next: (response: any) =>  {     
            console.log(response.data)                        
            console.info(response.message);
            this.resetVariable();
          }, 
          error: (e: any) => {
            console.error(e)
          },
          complete: () => console.info("save appointments completed succesfully")
        })   
      boolState = true;
    }else{
      boolState = false;      
    }
      
      return boolState
  }

  private resetVariable(){
    this.cartAppointmentSubject.next([]);
    this.durationTotalSubject.next(0);
    this.priceTotalSubject.next(0);
  
  }
}
  