import { TestBed } from '@angular/core/testing';

import { Whishlist } from './whishlist';

describe('Whishlist', () => {
  let service: Whishlist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Whishlist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
