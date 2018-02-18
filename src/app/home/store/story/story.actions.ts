import { Action } from '@ngrx/store';
import { Story } from '../../../shared/models/story.model';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';

export namespace StoryActions {
  export const types = {
    createStory: '[Story] Create Story',
    createStoryFail: '[Story] Create Story Fail',
    createStorySuccess: '[Story] Create Story Success',
    deleteStory: '[Story] Delete Story',
    deleteStoryFail: '[Story] Delete Story Fail',
    deleteStorySuccess: '[Story] Delete Story Success',
    loadStoryList: '[Story] Load Story List',
    loadStoryListFail: '[Story] Load Story List Fail',
    loadStoryListSuccess: '[Story] Load Story List Success',
    selectStory: '[Story] Select Story',
    updateStory: '[Story] Update Story',
    updateStoryFail: '[Story] Update Story Fail',
    updateStorySuccess: '[Story] Update Story Success',
  };

  /**
   * Create story actions
   */
  export class CreateStory implements Action {
    type = types.createStory;

    constructor(public payload: StoryFormPayload) {
    }
  }

  export class CreateStoryFail implements Action {
    type = types.createStoryFail;

    constructor(public payload: any) {
    }
  }

  export class CreateStorySuccess implements Action {
    type = types.createStorySuccess;

    constructor(public payload: Story) {
    }
  }

  /**
   * Delete story actions
   */
  export class DeleteStory implements Action {
    type = types.deleteStory;

    constructor(public payload: Story) {
    }
  }

  export class DeleteStoryFail implements Action {
    type = types.deleteStoryFail;

    constructor(public payload: any) {
    }
  }

  export class DeleteStorySuccess implements Action {
    type = types.deleteStorySuccess;

    constructor(public payload: Story) {
    }
  }

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

  /**
   * Update story actions
   */
  export class UpdateStory implements Action {
    type = types.updateStory;

    constructor(public payload: Story) {
    }
  }

  export class UpdateStoryFail implements Action {
    type = types.updateStoryFail;

    constructor(public payload: any) {
    }
  }

  export class UpdateStorySuccess implements Action {
    type = types.updateStorySuccess;

    constructor(public payload: Story) {
    }
  }
}
