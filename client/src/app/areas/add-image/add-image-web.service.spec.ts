import { TestBed } from '@angular/core/testing';

import { AddImageWebService } from './add-image-web.service';

describe('AddImageWebService', () => {
  let service: AddImageWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddImageWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
