import { Action } from '@ngrx/store';
import { Story } from '../../../shared/models/story.model';
import { Photo } from '../../../shared/models/photo.model';
import { importExpr } from '@angular/compiler/src/output/output_ast';

export namespace PhotosActions {
  export const types = {
    clearPhotoList: '[Story] Clear Photo List',
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
   * Clear photo action
   */
  export class ClearPhotoList implements Action {
    type = types.clearPhotoList;

    constructor() {
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

  export interface LoadPhotoListPayload {
    story: Story;
    photos: Photo[];
  }

  export class LoadPhotoListSuccess implements Action {
    type = types.loadPhotoListSuccess;

    constructor(public payload: Photo[]) {
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
