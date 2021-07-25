import { TestBed } from '@angular/core/testing';

import { AttemptService } from './attempt.service';

describe('AttemptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttemptService = TestBed.get(AttemptService);
    expect(service).toBeTruthy();
  });
});
