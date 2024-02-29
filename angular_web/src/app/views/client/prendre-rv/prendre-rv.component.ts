import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/api/user_service/user.service';
import { Appointment } from 'src/app/models/Appointment';
import { IconSetService } from '@coreui/icons-angular';
import { cilTrash, cilCheckAlt } from '@coreui/icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-prendre-rv',
  templateUrl: './prendre-rv.component.html',
  styleUrl: './prendre-rv.component.scss'
})
export class PrendreRvComponent implements OnInit{
  cartAppointments$: Observable<Appointment[]> = this.prendreRvService.cartAppointments$;
  durationTotal$: Observable<number> = this.prendreRvService.durationTotal$;
  priceTotal$: Observable<number> = this.prendreRvService.priceTotal$;
  priceTotal: number = 0;
  durationTotal: number = 0;
  dateDebut: Date = new Date();
  dateFin: Date = new Date();
  dateDebutStr: string = '';
  endDateStr: string = '';
  employes: User[] = [];
  private destroyed$ = new Subject<void>();   
  
  //ui variable
  loading = false;
  alertSuccess = false;
  alertError = false;

  // Define FormGroup to manage the form
  dateTimeForm: FormGroup | undefined | null;    

  constructor(
    private prendreRvService: PrendreRvService,
    private userService: UserService,
    public iconSet: IconSetService
    ) {
      iconSet.icons = { cilTrash, cilCheckAlt };
    }
    
  ngOnInit(): void {     
    this.initEmployes();    
  }

  calculate(): void {        
    this.prendreRvService.makeDateLinked();
    this.prendreRvService.calculDuration();
    this.prendreRvService.calculPrice();
  }

  //                                                                                                                          
  //initialisation listes des employes
  initEmployes(){
   this.userService.findByRole("employee")
    .subscribe({
      next: (response: any) =>  {
        this.employes = response.response.data;
        console.info(response.response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("initEmployes completed succesfully")
    })  
  }
  
  onSelect(employee_index: number, appointment_index: number){        
    this.prendreRvService.updateEmploye(this.employes[employee_index - 1], appointment_index)
  }


  validateRv(): void {     
    this.loading = true;  
    let boolstate = this.prendreRvService.save();
    if(boolstate === true){      
      this.alertSuccess = true;
    } 
    if(boolstate === false){      
      this.alertError = true;
    }     
    this.loading = false;
  }
  
  
  updateDate(dateTime: string, appointment_index: number){    
    this.prendreRvService.updateDate(dateTime, appointment_index)               
  }
  
  removeProductFromCart = (id: number): void => {
    this.prendreRvService.removeFromCart(id);
  };

  drop(event: CdkDragDrop<Appointment[]>){
    console.log('drop', event);
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
