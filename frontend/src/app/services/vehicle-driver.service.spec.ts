import { TestBed } from '@angular/core/testing';

import { VehicleDriverService } from './vehicle-driver.service';

describe('VehicleDriverService', () => {
  let service: VehicleDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
