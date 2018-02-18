import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryInitialState, storyReducer, StoryState } from './story/story.reducer';
import { PhotosInitialState, photosReducer, PhotosState } from './photos/photos.reducer';

export interface State {
  photosState: PhotosState;
  storyState: StoryState;
}

const initialState: State = {
  photosState: PhotosInitialState,
  storyState: StoryInitialState
};

export const reducers: ActionReducerMap<State> = {
  photosState: photosReducer,
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
