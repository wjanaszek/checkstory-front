import { Action } from '@ngrx/store';
import { Story } from '../../../shared/models/story.model';
import { Photo } from '../../../shared/models/photo.model';

export namespace PhotosActions {
  export const types = {
    createPhoto: '[Story] Create Photo',
    createPhotoFail: '[Story] Create Photo Fail',
    createPhotoSuccess: '[Story] Create Photo Success',
    deletePhoto: '[Story] Delete Photo',
    deletePhotoFail: '[Story] Delete Photo Fail',
    deletePhotoSuccess: '[Story] Delete Photo Success',
    loadPhotoList: '[Story] Load Photo List',
    loadPhotoListFail: '[Story] Load Photo List Fail',
    loadPhotoListSuccess: '[Story] Load Photo List Success',
    updatePhoto: '[Story] Update Photo',
    updatePhotoFail: '[Story] Update Photo Fail',
    updatePhotoSuccess: '[Story] Update Photo Success',
  };

  /**
   * Load photo list actions
   */
  export class LoadPhotoList implements Action {
    type = types.loadPhotoList;

    constructor(public payload: Story) {
    }
  }

  export class LoadPhotoListFail implements Action {
    type = types.loadPhotoListFail;

    constructor(public payload: any) {
    }
  }

  export interface LoadPhotoListPayload {
    story: Story;
    photos: Photo[];
  }

  export class LoadPhotoListSuccess implements Action {
    type = types.loadPhotoListSuccess;

    constructor(public payload: LoadPhotoListPayload) {
    }
  }
}
