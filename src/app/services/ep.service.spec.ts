/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpService } from './ep.service';

describe('Service: Ep', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpService]
    });
  });

  it('should ...', inject([EpService], (service: EpService) => {
    expect(service).toBeTruthy();
  }));
});
