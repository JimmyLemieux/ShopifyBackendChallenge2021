import { TestBed } from '@angular/core/testing';

import { HomeWebService } from './home-web.service';

describe('HomeWebService', () => {
  let service: HomeWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
