import { TestBed } from '@angular/core/testing';

import { FetchApi } from './fetch-api';

describe('FetchApi', () => {
  let service: FetchApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
