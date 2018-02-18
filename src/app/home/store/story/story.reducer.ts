import { StoryActions } from './story.actions';

export interface StoryState {
  selectedStory: any;
  storyList: any[];
}

export const StoryInitialState: StoryState = {
  selectedStory: null,
  storyList: []
};

export function storyReducer(state: StoryState = StoryInitialState, action): StoryState {
  switch (action.type) {

    case StoryActions.LoadStoryListSuccess: {
      return {...state, storyList: action.payload};
    }

    case StoryActions.SelectStory: {
      return {...state, selectedStory: action.payload};
    }

    default: {
      return state;
    }
  }
}
