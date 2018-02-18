import { TestBed, async, inject } from '@angular/core/testing';

import { StoryDetailGuard } from './story-detail.guard';

describe('StoryDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoryDetailGuard]
    });
  });

  it('should ...', inject([StoryDetailGuard], (guard: StoryDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
