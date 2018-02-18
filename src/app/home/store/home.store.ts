import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryInitialState, storyReducer, StoryState } from './story/story.reducer';

export interface State {
  storyState: StoryState;
}

const initialState: State = {
  storyState: StoryInitialState
};

export const reducers: ActionReducerMap<State> = {
  storyState: storyReducer,
};

export const getHomeState = createFeatureSelector<State>('home');

/**
 * Story selectors
 */
export const getStoryState = createSelector(
  getHomeState,
  state => state.storyState
);

export const getStoryList = createSelector(
  getStoryState,
  state => state.storyList
);

export const getSelectedStory = createSelector(
  getStoryState,
  state => state.selectedStory
);
