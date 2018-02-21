import { TestBed, async, inject } from '@angular/core/testing';

import { CompareGuard } from './compare.guard';

describe('CompareGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompareGuard]
    });
  });

  it('should ...', inject([CompareGuard], (guard: CompareGuard) => {
    expect(guard).toBeTruthy();
  }));
});
