import { TestBed } from '@angular/core/testing';

import { TransformStoreService } from './transform-store.service';

describe('TransformStoreService', () => {
  let service: TransformStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
