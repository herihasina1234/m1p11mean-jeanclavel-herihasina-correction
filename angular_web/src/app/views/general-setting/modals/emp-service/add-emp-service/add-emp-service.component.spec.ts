import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpServiceComponent } from './add-emp-service.component';

describe('AddEmpServiceComponent', () => {
  let component: AddEmpServiceComponent;
  let fixture: ComponentFixture<AddEmpServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmpServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmpServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
