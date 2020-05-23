import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardProfesor } from './authProfesor.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardProfesor]
    });
  });

  it('should ...', inject([AuthGuardProfesor], (guard: AuthGuardProfesor) => {
    expect(guard).toBeTruthy();
  }));
});
