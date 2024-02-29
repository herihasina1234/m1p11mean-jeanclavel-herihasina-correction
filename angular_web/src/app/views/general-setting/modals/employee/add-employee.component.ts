import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/api/user_service/user.service';
import { Employee } from 'src/app/models/Employee';
import { GlobalConstants } from 'src/app/services/global-constants';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  @Output() empAdded = new EventEmitter<Employee>();
  serviceForm: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private formBuilder: FormBuilder,
    private empService: UserService
  ) {
    this.createForm();
  }

  createForm(): void {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', [Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;

      console.log("eto aloha ",formData);
      
      const empData: Employee = {
        _id: '',
        name: formData.name,
        firstname: formData.firstName,
        email: formData.email,
        password: formData.password,
        role: {
          _id: GlobalConstants.emloyeeRole
        }
      };

      await this.createService(empData);
    }
  }

  async createService(empData: Employee) {
    try {
      const createdEmployee = await this.empService.create(empData).toPromise();
      this.empAdded.emit(createdEmployee);
      this.serviceForm.reset();
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'ajout de l'employé :", error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
