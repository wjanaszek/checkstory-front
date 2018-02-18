import { TestBed, async, inject } from '@angular/core/testing';

import { StoryGuardGuard } from './story-guard.guard';

describe('StoryGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryGuardGuard]
    });
  });

  it('should ...', inject([StoryGuardGuard], (guard: StoryGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
