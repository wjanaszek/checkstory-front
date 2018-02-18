import { StoryActions } from './story.actions';
import { Story } from '../../../shared/models/story.model';

export interface StoryState {
  selectedStory: any;
  storyList: Story[];
}

export const StoryInitialState: StoryState = {
  selectedStory: null,
  storyList: []
};

export function storyReducer(state: StoryState = StoryInitialState, action): StoryState {
  switch (action.type) {

    case StoryActions.types.createStorySuccess: {
      const stories = [action.payload, ...state.storyList];
      return {...state, storyList: stories};
    }

    case StoryActions.types.deleteStorySuccess: {
      const stories = state.storyList.filter(story => story.id !== action.payload.id);
      if (state.selectedStory && state.selectedStory.id === action.payload.id) {
        return {...state, storyList: stories, selectedStory: null};
      } else {
        return {...state, storyList: stories};
      }
    }

    case StoryActions.types.loadStoryListSuccess: {
      return {...state, storyList: action.payload};
    }

    case StoryActions.types.selectStory: {
      return {...state, selectedStory: action.payload};
    }

    default: {
      return state;
    }
  }
}
