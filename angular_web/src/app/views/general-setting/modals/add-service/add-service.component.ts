import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from 'src/app/models/Service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  serviceForm: FormGroup = new FormGroup({});
  form: any;
  isUpdate: boolean;
  oneservice: any;

  constructor( private dialogRef: MatDialogRef<AddServiceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder, private service:ServiceService) {
    this.isUpdate = data && data.isUpdate;
    this.createForm();
    if (this.isUpdate) {
      this.setFormData(data.service);
    }
  }

  createForm(): void {
    this.serviceForm = this.formBuilder.group({
      designation: ['', Validators.required],
      price: [0, Validators.min(0)],
      duration: [0, Validators.min(0)],
      commission: [0, Validators.min(0)]
    });
  }

  
//   setFormData(service: Service): void {
//     this.serviceForm.patchValue({
//         _id: service._id, 
//         designation: service.designation,
//         price: service.price,
//         duration: service.duration,
//         commission: service.commission
//     });
// }
setFormData(service: Service): void {
  this.serviceForm.patchValue({
      _id: service._id, 
      designation: service.designation,
      price: service.price,
      duration: service.duration,
      commission: service.commission
  });
}

  async onSubmit() {
    console.log('tonga eto ve');
    
    if (this.serviceForm.valid) {
        const formData = this.serviceForm.value;
        console.log(formData);
        
        const serviceData: Service = {
            _id : '',
            designation: formData.designation,
            price: formData.price,
            duration: formData.duration,
            commission: formData.commission
        };

        if (this.isUpdate) {
            await this.updateService(formData);
        } else {
            await this.createService(serviceData);
        }
    }
}

async createService(serviceData: Service) {
    try {
        console.log("apppp: ", serviceData);
        const createdService = await this.service.create(serviceData).toPromise();
        this.serviceAdded.emit(createdService);
        this.serviceForm.reset();
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout du service :", error);
    }
}

async updateService(serviceId: string) {
  try {
      console.log("id: ", serviceId);
      
      // Utilisez directement le serviceId pour récupérer le service
      const serviceById = await this.service.getById(serviceId).toPromise();
      console.log("serviceById .. :",serviceById);
      

      // Vérifiez si le service a été récupéré avec succès
      if (serviceById && serviceById.data) {
          const updatedService = await this.service.update(serviceId, serviceById.data).toPromise();
          this.serviceAdded.emit(updatedService);
          this.serviceForm.reset();
      } else {
          console.error("Service not found or data is invalid");
      }
  } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour du service :", error);
  }
}


  closeDialog() {
    this.dialogRef.close(); // Cette méthode ferme le dialogue
  }
}
