import { Photo } from '../../../shared/models/photo.model';
import { PhotosActions } from './photos.actions';

export interface PhotosState {
  photos: Photo[];
  photosLoading: boolean;
}

export const PhotosInitialState: PhotosState = {
  photos: [],
  photosLoading: false
};

export function photosReducer(state: PhotosState = PhotosInitialState, action): PhotosState {
  switch (action.type) {

    case PhotosActions.types.loadPhotoList: {
      return {...state, photosLoading: true};
    }

    case PhotosActions.types.loadPhotoListFail: {
      return {...state, photosLoading: false};
    }

    case PhotosActions.types.loadPhotoListSuccess: {
      return {...state, photos: action.payload, photosLoading: false};
    }

    default: {
      return state;
    }
  }
}
