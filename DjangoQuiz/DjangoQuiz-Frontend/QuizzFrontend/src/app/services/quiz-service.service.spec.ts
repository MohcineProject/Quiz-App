import { TestBed } from '@angular/core/testing';

import { QuizServiceService } from './quiz-service.service';

describe('QuizzServiceService', () => {
  let service: QuizServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
