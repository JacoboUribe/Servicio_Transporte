import { TestBed } from '@angular/core/testing';

import { NaturalPeopleService } from './natural-people.service';

describe('NaturalPeopleService', () => {
  let service: NaturalPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturalPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
