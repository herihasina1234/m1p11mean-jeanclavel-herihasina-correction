import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { ServiceService } from 'src/app/services/api/service_service/service.service';
import { PrendreRvService } from 'src/app/services/prendre-rv/prendre-rv.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.scss'
})
export class ServicesListComponent implements OnInit, OnDestroy {
  //autoRefresh variable
  private intervalId?: number;
  
  services$: Observable<Service[]> = this.serviceService.dataList$;  
  totalPages$: Observable<number> = this.serviceService.totalPages$;
  paginationTable$: Observable<number[]> = this.serviceService.paginationTable$;
  
  //pagination variable

  currentPage: number = 1;
  pageSize: number = 3;
  totalItems: number = 0;

  
  constructor(
    private serviceService: ServiceService,
    private prendreRvService: PrendreRvService
  ){
    this.intervalId = window.setInterval(() => {
      this.refreshServices();
    }, 100000);
  } 

  ngOnInit(): void {
    this.refreshServices();
  }  
  
  ngOnDestroy(): void {
    if(this.intervalId)
      clearInterval(this.intervalId);    
  }
  
  onPageChange(event: any): void {
    this.currentPage = event;
    this.refreshServices();
  }

  refreshServices(){
    let params:{ 
      page?: number,
      pageSize?: number
    } = { }

    params.page = this.currentPage;
    params.pageSize = this.pageSize;

    this.serviceService.getAllPaginate(params);
  }
  
  addServiceToCart(service: Service){ 
    this.prendreRvService.addToCart(service);
  };
}
