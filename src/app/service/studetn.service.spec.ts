import { TestBed } from '@angular/core/testing';

import { StudetnService } from './studetn.service';

describe('StudetnService', () => {
  let service: StudetnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudetnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
