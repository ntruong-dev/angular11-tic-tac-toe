import { TestBed } from '@angular/core/testing';

import { CanAccessGamePageGuard } from './can-access-game-page.guard';

describe('CanAccessGamePageGuard', () => {
  let guard: CanAccessGamePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAccessGamePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
