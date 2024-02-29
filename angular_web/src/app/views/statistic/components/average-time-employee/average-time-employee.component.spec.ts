import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTimeEmployeeComponent } from './average-time-employee.component';

describe('AverageTimeEmployeeComponent', () => {
  let component: AverageTimeEmployeeComponent;
  let fixture: ComponentFixture<AverageTimeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageTimeEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageTimeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
