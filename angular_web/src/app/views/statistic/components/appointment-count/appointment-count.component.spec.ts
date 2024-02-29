import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCountComponent } from './appointment-count.component';

describe('AppointmentCountComponent', () => {
  let component: AppointmentCountComponent;
  let fixture: ComponentFixture<AppointmentCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
