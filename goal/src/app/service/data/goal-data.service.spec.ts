import { TestBed } from '@angular/core/testing';

import { GoalDataService } from './goal-data.service';

describe('GoalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalDataService = TestBed.get(GoalDataService);
    expect(service).toBeTruthy();
  });
});
