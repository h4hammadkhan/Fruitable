/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderserviceService } from './orderservice.service';

describe('Service: Orderservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderserviceService]
    });
  });

  it('should ...', inject([OrderserviceService], (service: OrderserviceService) => {
    expect(service).toBeTruthy();
  }));
});
