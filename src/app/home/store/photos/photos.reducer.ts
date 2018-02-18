import { Photo } from '../../../shared/models/photo.model';

export interface PhotosState {
  photos: Photo[];
}

export const PhotosInitialState: PhotosState = {
  photos: []
};

export function photosReducer(state: PhotosState = PhotosInitialState, action): PhotosState {
  switch (action.type) {

    default: {
      return state;
    }
  }
}
