import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employeeservice } from '../../../../../models/Employee_service';
import { Service } from 'src/app/models/Service';
import { User } from '../../../../../models/User';
import { EmployeeServiceService } from 'src/app/services/api/employee_service_service/employee-service.service';
import { ServiceService } from 'src/app/services/api/service_service/service.service';
import { UserService } from '../../../../../services/api/user_service/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog'; 
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-emp-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './add-emp-service.component.html',
  styleUrl: './add-emp-service.component.scss'
})
export class AddEmpServiceComponent implements OnInit {
  @Output() empServiceAdded = new EventEmitter<Employeeservice>();
  empForm: FormGroup = new FormGroup({});
  oneService: any = null;
  listService: Service[] = [];
  ListEmp: User[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddEmpServiceComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeServiceService,
    private serviceService: ServiceService,
    private userService: UserService
  ) {
    this.empForm = this.formBuilder.group({
      employee: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.serviceService.getAll().subscribe(
      (response: any) => {
        this.listService = response.response.data;
        console.log("services: ", this.listService);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des services :', error);
      }
    );
    this.userService.getAll().subscribe(
      (response: any) => {
        this.ListEmp = response.response.data;
        console.log("services: ", this.ListEmp);
      },
      (error) => {
        console.error('Erreur lors de la récupération des services :', error);
      }
    );
  }

  async onSubmit() {
    if (this.empForm.valid) {
        const formData = this.empForm.value;
        console.log(formData);
        
        const empServiceData: Employeeservice = {
            _id : '',
            employee: formData.employee._id,
            service: formData.service._id,
        };

        
        await this.createEmpService(empServiceData);
        
    }
  }
  async createEmpService(empServiceData: Employeeservice) {
    try {
        console.log("apppp: ", empServiceData);
        const createdEmpService = await this.employeeService.create(empServiceData).toPromise();
        this.empServiceAdded.emit(createdEmpService);
        this.empForm.reset();
    } catch (error) {
        console.error("Une erreur s'est produite lors de l' ajout de l'employé dans un service :", error);
    }
  }

  closeDialog() {
    this.dialogRef.close(); // Cette méthode ferme le dialogue
  }

  // createForm(): void {
  //   this.serviceForm = this.formBuilder.group({
  //     designation: ['', Validators.required],
  //     price: [0, Validators.min(0)],
  //     duration: [0, Validators.min(0)],
  //     commission: [0, Validators.min(0)]
  //   });
  // }
}
