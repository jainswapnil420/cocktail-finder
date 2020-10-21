import { TestBed } from '@angular/core/testing';

import { LoadcocktailService } from './loadcocktail.service';

describe('LoadcocktailService', () => {
  let service: LoadcocktailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadcocktailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
