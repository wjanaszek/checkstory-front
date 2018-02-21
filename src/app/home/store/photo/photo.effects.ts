import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { PhotoActions } from './photo.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { config } from '../../../config';
import { Story } from '../../../shared/models/story.model';
import { of } from 'rxjs/observable/of';
import { Photo } from '../../../shared/models/photo.model';
import { MatSnackBar } from '@angular/material';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { ComparePhotosFailType } from '../../../shared/enums/compare-photos-fail-type.enum';
import PhotoActionPayload = PhotoActions.PhotoActionPayload;
import ComparePhotosFailPayload = PhotoActions.ComparePhotosFailPayload;

@Injectable()
export class PhotoEffects {

  @Effect()
  comparePhotos$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.comparePhotos)
    .pipe(
      map((action: PhotoActions.ComparePhotos) => action.payload),
      switchMap((payload: Photo[]) => {
        if (payload.length < 2) {
          return of(new PhotoActions.ComparePhotosFail({type: ComparePhotosFailType.tooFewPhotos}));
        } else if (payload.length > 2) {
          return of(new PhotoActions.ComparePhotosFail({type: ComparePhotosFailType.tooManyPhotos}));
        } else {
          return this.http.post(config.endpoints.comparePhotos, {
            originalImageId: payload[0].id,
            modifiedImageId: payload[1].id,
            resize: false,
            boundingRectangles: false
          })
            .pipe(
              map((res: any) => new PhotoActions.ComparePhotosSuccess(Photo.deserialize(res))),
              catchError((err: HttpErrorResponse) => of(new PhotoActions.ComparePhotosFail({type: ComparePhotosFailType.apiError})))
            );
        }
      })
    );

  @Effect()
  comparePhotosFail$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.comparePhotosFail)
    .pipe(
      map((action: PhotoActions.ComparePhotosFail) => action.payload),
      switchMap((payload: ComparePhotosFailPayload) => {
        let message: string;
        switch (payload.type) {
          case ComparePhotosFailType.apiError: {
            message = 'Something went wrong';
            break;
          }
          case ComparePhotosFailType.tooFewPhotos: {
            message = 'Too few photos to compare. Choose 2 photos';
            break;
          }
          case ComparePhotosFailType.tooManyPhotos: {
            message = 'Too many photos to compare. Choose 2 photos';
            break;
          }
        }
        this.snackbar.open(message, 'OK');
        return new EmptyObservable();
      })
    );

  @Effect()
  createPhoto$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.createPhoto)
    .pipe(
      map((action: PhotoActions.CreatePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        this.snackbar.open('Uploading photo', 'OK');
        return this.http.post(config.endpoints.createPhoto.replace(':storyNumber', `${payload.story.id}`), payload.photo)
          .pipe(
            map((res: any) => new PhotoActions.CreatePhotoSuccess({id: res.id, photo: payload.photo})),
            catchError((err: HttpErrorResponse) => of(new PhotoActions.CreatePhotoFail(err)))
          );
      })
    );

  @Effect()
  deletePhoto$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.deletePhoto)
    .pipe(
      map((action: PhotoActions.DeletePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        const tmpUrl = config.endpoints.deletePhoto.replace(':storyNumber', `${payload.story.id}`);
        const url = tmpUrl.replace(':photoNumber', `${payload.photo.id}`);
        return this.http.delete(url)
          .pipe(
            map((res: any) => new PhotoActions.DeletePhotoSuccess(payload.photo)),
            catchError((err: HttpErrorResponse) => of(new PhotoActions.DeletePhotoFail(err)))
          );
      })
    );

  @Effect()
  loadPhotoList$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.loadPhotoList)
    .pipe(
      map((action: PhotoActions.LoadPhotoList) => action.payload),
      switchMap((payload: Story) => {
        return this.http.get(config.endpoints.loadPhotoList.replace(':storyNumber', `${payload.id}`))
          .pipe(
            map((res: any) => new PhotoActions.LoadPhotoListSuccess(res.photos.map(data => {
              return Photo.deserialize(data);
            }))),
            catchError((err: HttpErrorResponse) => of(new PhotoActions.LoadPhotoListFail(err)))
          );
      })
    );

  @Effect()
  updatePhoto$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.updatePhoto)
    .pipe(
      map((action: PhotoActions.UpdatePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        const tmpUrl = config.endpoints.updatePhoto.replace(':storyNumber', `${payload.story.id}`);
        const url = tmpUrl.replace(':photoNumber', `${payload.photo.id}`);
        return this.http.put(url, payload.photo)
          .pipe(
            map((res: any) => new PhotoActions.UpdatePhotoSuccess(payload.photo)),
            catchError((err: HttpErrorResponse) => of(new PhotoActions.UpdatePhotoFail(err)))
          );
      })
    );

  constructor(private actions$: Actions, private http: HttpClient, private snackbar: MatSnackBar) {
  }
}
