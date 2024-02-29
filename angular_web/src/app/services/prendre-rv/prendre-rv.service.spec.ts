import { TestBed } from '@angular/core/testing';

import { PrendreRvService } from './prendre-rv.service';

describe('PrendreRvService', () => {
  let service: PrendreRvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrendreRvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
