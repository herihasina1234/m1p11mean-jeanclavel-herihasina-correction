import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendreRvComponent } from './prendre-rv.component';

describe('PrendreRvComponent', () => {
  let component: PrendreRvComponent;
  let fixture: ComponentFixture<PrendreRvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrendreRvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrendreRvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
