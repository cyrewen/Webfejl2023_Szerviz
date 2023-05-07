import { TestBed } from '@angular/core/testing';

import { HttpErrorGuard } from './http-error.guard';

describe('HttpErrorGuard', () => {
  let guard: HttpErrorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HttpErrorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
