/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TelecomService } from './telecom.service';

describe('Service: Telecom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelecomService]
    });
  });

  it('should ...', inject([TelecomService], (service: TelecomService) => {
    expect(service).toBeTruthy();
  }));
});
