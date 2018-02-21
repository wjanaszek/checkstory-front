import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryInitialState, storyReducer, StoryState } from './story/story.reducer';
import { PhotoInitialState, photoReducer, PhotoState } from './photo/photo.reducer';

export interface State {
  photoState: PhotoState;
  storyState: StoryState;
}

const initialState: State = {
  photoState: PhotoInitialState,
  storyState: StoryInitialState
};

export const reducers: ActionReducerMap<State> = {
  photoState: photoReducer,
  storyState: storyReducer,
};

export const getHomeState = createFeatureSelector<State>('home');

/**
 * Photo selectors
 */
export const getPhotoState = createSelector(
  getHomeState,
  state => state.photoState
);

export const getPhotosCompareResult = createSelector(
  getPhotoState,
  state => state.compareResult
);

export const getPhotoList = createSelector(
  getPhotoState,
  state => state.photos
);

export const getPhotosComparing = createSelector(
  getPhotoState,
  state => state.photosComparing
);

export const getPhotosLoading = createSelector(
  getPhotoState,
  state => state.photosLoading
);

export const getPhotosToCompare = createSelector(
  getPhotoState,
  state => state.photosToCompare
);

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
