import { TestBed } from '@angular/core/testing';

import { CursosService } from './quizzes.service';

describe('QuizzesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CursosService = TestBed.get(CursosService);
    expect(service).toBeTruthy();
  });
});
