import { Action } from '@ngrx/store';
import { Story } from '../../../shared/models/story.model';
import { Photo } from '../../../shared/models/photo.model';

export namespace StoryActions {
  export const types = {
    createStory: '[Story] Create Story',
    createStoryFail: '[Story] Create Story Fail',
    createStorySuccess: '[Story] Create Story Success',
    loadStoryList: '[Story] Load Story List',
    loadStoryListFail: '[Story] Load Story List Fail',
    loadStoryListSuccess: '[Story] Load Story List Success',
    selectStory: '[Story] Select Story',
    updateStory: '[Story] Update Story',
    updateStoryFail: '[Story] Update Story Fail',
    updateStorySuccess: '[Story] Update Story Success',
  };

  /**
   * Load story list actions
   */
  export class LoadStoryList implements Action {
    type = types.loadStoryList;

    constructor() {
    }
  }

  export class LoadStoryListFail implements Action {
    type = types.loadStoryListFail;

    constructor(public payload: any) {
    }
  }

  export class LoadStoryListSuccess implements Action {
    type = types.loadStoryListSuccess;

    constructor(public payload: Story[]) {
    }
  }

  /**
   * Select story action
   */
  export class SelectStory implements Action {
    type = types.selectStory;

    constructor(public payload: Story) {
    }
  }
}
