import { inject, TestBed } from '@angular/core/testing';

import { StoryGuard } from './story.guard';

describe('StoryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryGuard]
    });
  });

  it('should ...', inject([StoryGuard], (guard: StoryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
