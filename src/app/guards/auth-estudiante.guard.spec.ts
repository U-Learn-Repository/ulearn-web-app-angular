import { TestBed, async, inject } from '@angular/core/testing';

import { AuthEstudianteGuard } from './auth-estudiante.guard';

describe('AuthEstudianteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthEstudianteGuard]
    });
  });

  it('should ...', inject([AuthEstudianteGuard], (guard: AuthEstudianteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
