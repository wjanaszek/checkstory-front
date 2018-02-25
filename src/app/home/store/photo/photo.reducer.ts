import { Photo } from '../../../shared/models/photo.model';
import { PhotoActions } from './photo.actions';

export interface PhotoState {
  compareResult: Photo;
  photos: Photo[];
  photosComparing: boolean;
  photosLoading: boolean;
  photosToCompare: Photo[];
}

export const PhotoInitialState: PhotoState = {
  compareResult: null,
  photos: [],
  photosComparing: false,
  photosLoading: false,
  photosToCompare: []
};

export function photoReducer(state: PhotoState = PhotoInitialState, action): PhotoState {
  switch (action.type) {

    case PhotoActions.types.comparePhotos: {
      return {...state, photosComparing: true};
    }

    case PhotoActions.types.comparePhotosFail: {
      return {...state, photosComparing: false};
    }

    case PhotoActions.types.comparePhotosSuccess: {
      return {...state, compareResult: action.payload, photosComparing: false};
    }

    case PhotoActions.types.clearPhotoList: {
      return {...state, photos: null, compareResult: null, photosToCompare: []};
    }

    case PhotoActions.types.createPhotoSuccess: {
      const addedPhoto = {...action.payload.photo};
      addedPhoto.id = action.payload.id;
      const photos = [addedPhoto, ...state.photos];
      return {...state, photos: photos};
    }

    case PhotoActions.types.deletePhotoSuccess: {
      return {
        ...state,
        photos: state.photos.filter(photo => photo.id !== action.payload.id),
        photosToCompare: state.photosToCompare.filter(photo => photo.id !== action.payload.id)
      };
    }

    case PhotoActions.types.loadPhotoList: {
      return {...state, compareResult: null, photosLoading: true, photosToCompare: []};
    }

    case PhotoActions.types.loadPhotoListFail: {
      return {...state, photosLoading: false};
    }

    case PhotoActions.types.loadPhotoListSuccess: {
      return {...state, photos: action.payload, photosLoading: false};
    }

    case PhotoActions.types.setPhotoToCompare: {
      if (state.photosToCompare.some(photo => photo.id === action.payload.id)) {
        return {...state, photosToCompare: state.photosToCompare.filter(photo => photo.id !== action.payload.id)};
      } else {
        const photosToCompare = [...state.photosToCompare, action.payload];
        return {...state, photosToCompare: photosToCompare};
      }
    }

    case PhotoActions.types.updatePhotoSuccess: {
      return {
        ...state, photos: state.photos.map(photo => {
          if (photo.id === action.payload.id) {
            return action.payload;
          } else {
            return photo;
          }
        }), photosToCompare: state.photosToCompare.filter(photo => photo.id !== action.payload.id)
      };
    }

    default: {
      return state;
    }
  }
}
