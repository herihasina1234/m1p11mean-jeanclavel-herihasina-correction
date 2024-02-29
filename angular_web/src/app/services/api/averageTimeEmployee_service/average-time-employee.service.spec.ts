import { TestBed } from '@angular/core/testing';

import { AverageTimeEmployeeService } from './average-time-employee.service';

describe('AverageTimeEmployeeService', () => {
  let service: AverageTimeEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AverageTimeEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
