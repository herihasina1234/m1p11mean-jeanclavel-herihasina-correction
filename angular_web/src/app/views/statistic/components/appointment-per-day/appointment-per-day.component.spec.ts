import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPerDayComponent } from './appointment-per-day.component';

describe('AppointmentPerDayComponent', () => {
  let component: AppointmentPerDayComponent;
  let fixture: ComponentFixture<AppointmentPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentPerDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
