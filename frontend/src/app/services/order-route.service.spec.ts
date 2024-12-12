import { TestBed } from '@angular/core/testing';

import { OrderRouteService } from './order-route.service';

describe('OrderRouteService', () => {
  let service: OrderRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
