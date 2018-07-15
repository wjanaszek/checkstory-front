import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { PhotoActions } from './photo.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { config } from '../../../config';
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
          const tmpUrl = config.endpoints.comparePhotos.replace(':firstId', payload[0].id.toString());
          const url = tmpUrl.replace(':secondId', payload[1].id.toString());
          return this.http.get(url, {
            params: {
              sensitivity: '200'
            }
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
        return this.http.post(config.endpoints.createPhoto.replace(':storyId', `${payload.story.id}`), payload.photo)
          .pipe(
            map((res: any) => new PhotoActions.CreatePhotoSuccess({id: res.id, photo: payload.photo})),
            catchError((err: HttpErrorResponse) => of(new PhotoActions.CreatePhotoFail(err)))
          );
      })
    );

  @Effect()
  createPhotoSuccess$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.createPhotoSuccess)
    .pipe(
      switchMap(() => {
        this.snackbar.open('Photo uploaded successfully', 'OK', {duration: 2000});
        return new EmptyObservable();
      })
    );

  @Effect()
  deletePhoto$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.deletePhoto)
    .pipe(
      map((action: PhotoActions.DeletePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        const tmpUrl = config.endpoints.deletePhoto.replace(':storyId', `${payload.story.id}`);
        const url = tmpUrl.replace(':photoId', `${payload.photo.id}`);
        return this.http.delete(url)
          .pipe(
            map((res: any) => new PhotoActions.DeletePhotoSuccess(payload.photo)),
            catchError((err: HttpErrorResponse) => of(new PhotoActions.DeletePhotoFail(err)))
          );
      })
    );

  @Effect()
  updatePhoto$: Observable<Action> = this.actions$
    .ofType(PhotoActions.types.updatePhoto)
    .pipe(
      map((action: PhotoActions.UpdatePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        const tmpUrl = config.endpoints.updatePhoto.replace(':storyId', `${payload.story.id}`);
        const url = tmpUrl.replace(':photoId', `${payload.photo.id}`);
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
