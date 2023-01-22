import { TestBed } from '@angular/core/testing';

import { IsSellerAdminLoginGuard } from './is-seller-admin-login.guard';

describe('IsSellerAdminLoginGuard', () => {
  let guard: IsSellerAdminLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSellerAdminLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
