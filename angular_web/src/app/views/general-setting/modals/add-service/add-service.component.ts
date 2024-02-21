import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from 'src/app/models/Service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceService } from 'src/app/services/api/service_service/service.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {
  @Output() serviceAdded = new EventEmitter<Service>();
  serviceForm: FormGroup;
form: any;

  constructor( private dialogRef: MatDialogRef<AddServiceComponent>,
    private formBuilder: FormBuilder, private service:ServiceService) {
    this.serviceForm = this.formBuilder.group({
      designation: ['', Validators.required],
      price: [0, Validators.min(0)],
      duration: [0, Validators.min(0)],
      commission: [0, Validators.min(0)]
    });
  }

  async onSubmit() {
    if (this.serviceForm.valid) {
      const newService: Service = {
        id: '', // L'ID sera généré côté backend
        designation: this.serviceForm.value.designation,
        price: this.serviceForm.value.price,
        duration: this.serviceForm.value.duration,
        commission: this.serviceForm.value.commission
      };
      try {
        console.log("apppp: ", newService);
        await this.service.create(newService).toPromise(); // Attendre la résolution de la promesse
        this.serviceAdded.emit(newService);
        this.serviceForm.reset();
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout du service :", error);
      }
    
    }
  }
  closeDialog() {
    this.dialogRef.close(); // Cette méthode ferme le dialogue
  }
}
