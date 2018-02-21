import { Action } from '@ngrx/store';
import { Story } from '../../../shared/models/story.model';
import { Photo } from '../../../shared/models/photo.model';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ComparePhotosFailType } from '../../../shared/enums/compare-photos-fail-type.enum';

export namespace PhotoActions {
  export const types = {
    clearPhotoList: '[Photo] Clear Photo List',
    comparePhotos: '[Photo] Compare Photos',
    comparePhotosFail: '[Photo] Compare Photos Fail',
    comparePhotosSuccess: '[Photo] Compare Photos Success',
    createPhoto: '[Photo] Create Photo',
    createPhotoFail: '[Photo] Create Photo Fail',
    createPhotoSuccess: '[Photo] Create Photo Success',
    deletePhoto: '[Photo] Delete Photo',
    deletePhotoFail: '[Photo] Delete Photo Fail',
    deletePhotoSuccess: '[Photo] Delete Photo Success',
    loadPhotoList: '[Photo] Load Photo List',
    loadPhotoListFail: '[Photo] Load Photo List Fail',
    loadPhotoListSuccess: '[Photo] Load Photo List Success',
    setPhotoToCompare: '[Photo] Set Photo To Compare',
    updatePhoto: '[Photo] Update Photo',
    updatePhotoFail: '[Photo] Update Photo Fail',
    updatePhotoSuccess: '[Photo] Update Photo Success',
  };

  /**
   * Clear photo action
   */
  export class ClearPhotoList implements Action {
    type = types.clearPhotoList;

    constructor() {
    }
  }

  /**
   * Compare photos actions
   */
  export class ComparePhotos implements Action {
    type = types.comparePhotos;

    constructor(public payload: Photo[]) {
    }
  }

  export interface ComparePhotosFailPayload {
    type: ComparePhotosFailType;
  }

  export class ComparePhotosFail implements Action {
    type = types.comparePhotosFail;

    constructor(public payload: ComparePhotosFailPayload) {
    }
  }

  export class ComparePhotosSuccess implements Action {
    type = types.comparePhotosSuccess;

    constructor(public payload: Photo) {
    }
  }

  /**
   * Create photo actions
   */
  export interface PhotoActionPayload {
    photo: Photo;
    story: Story;
  }

  export interface CreatePhotoSuccessPayload {
    id: string;
    photo: Photo;
  }

  export class CreatePhoto implements Action {
    type = types.createPhoto;

    constructor(public payload: PhotoActionPayload) {
    }
  }

  export class CreatePhotoFail implements Action {
    type = types.createPhotoFail;

    constructor(public payload: any) {
    }
  }

  export class CreatePhotoSuccess implements Action {
    type = types.createPhotoSuccess;

    constructor(public payload: CreatePhotoSuccessPayload) {
    }
  }

  /**
   * Delete photo actions
   */
  export class DeletePhoto implements Action {
    type = types.deletePhoto;

    constructor(public payload: PhotoActionPayload) {
    }
  }

  export class DeletePhotoFail implements Action {
    type = types.deletePhotoFail;

    constructor(public payload: any) {
    }
  }

  export class DeletePhotoSuccess implements Action {
    type = types.deletePhotoSuccess;

    constructor(public payload: Photo) {
    }
  }

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

  export class LoadPhotoListSuccess implements Action {
    type = types.loadPhotoListSuccess;

    constructor(public payload: Photo[]) {
    }
  }

  /**
   * Set photo to compare action
   */
  export class SetPhotoToCompare implements Action {
    type = types.setPhotoToCompare;

    constructor(public payload: Photo) {
    }
  }

  /**
   * Update photo actions
   */
  export class UpdatePhoto implements Action {
    type = types.updatePhoto;

    constructor(public payload: PhotoActionPayload) {
    }
  }

  export class UpdatePhotoFail implements Action {
    type = types.updatePhotoFail;

    constructor(public payload: any) {
    }
  }

  export class UpdatePhotoSuccess implements Action {
    type = types.updatePhotoSuccess;

    constructor(public payload: Photo) {
    }
  }
}
