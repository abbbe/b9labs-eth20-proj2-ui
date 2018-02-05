import { TestBed, inject } from '@angular/core/testing';

import { RemittanceService } from './remittance.service';

describe('RemittanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemittanceService]
    });
  });

  it('should be created', inject([RemittanceService], (service: RemittanceService) => {
    expect(service).toBeTruthy();
  }));
});
