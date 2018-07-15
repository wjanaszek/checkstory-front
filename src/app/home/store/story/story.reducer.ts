import { StoryActions } from './story.actions';
import { Story } from '../../../shared/models/story.model';

export interface StoryState {
  selectedStory: Story;
  selectedStoryLoading: boolean;
  storyList: Story[];
  storyListLoading: boolean;
}

export const StoryInitialState: StoryState = {
  selectedStory: null,
  selectedStoryLoading: false,
  storyList: [],
  storyListLoading: false
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

    case StoryActions.types.loadStoryList: {
      return {...state, storyListLoading: true};
    }

    case StoryActions.types.loadStoryListFail: {
      return {...state, storyListLoading: false};
    }

    case StoryActions.types.loadStoryListSuccess: {
      return {...state, storyList: action.payload, storyListLoading: false};
    }

    case StoryActions.types.loadStory: {
      return {...state, selectedStory: null, selectedStoryLoading: true};
    }

    case StoryActions.types.loadStoryFail: {
      return {...state, selectedStoryLoading: false};
    }

    case StoryActions.types.loadStorySuccess: {
      return {...state, selectedStory: action.payload, selectedStoryLoading: false};
    }

    case StoryActions.types.updateStorySuccess: {
      const stories = state.storyList.map(story => {
        if (story.id === action.payload.id) {
          return action.payload;
        } else {
          return story;
        }
      });
      if (state.selectedStory.id === action.payload.id) {
        return {...state, storyList: stories, selectedStory: action.payload};
      } else {
        return {...state, storyList: stories};
      }
    }

    default: {
      return state;
    }
  }
}
