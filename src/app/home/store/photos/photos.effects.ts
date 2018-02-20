import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { PhotosActions } from './photos.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { config } from '../../../config';
import { Story } from '../../../shared/models/story.model';
import { of } from 'rxjs/observable/of';
import { Photo } from '../../../shared/models/photo.model';
import { MatSnackBar } from '@angular/material';
import PhotoActionPayload = PhotosActions.PhotoActionPayload;

@Injectable()
export class PhotosEffects {

  @Effect()
  createPhoto$: Observable<Action> = this.actions$
    .ofType(PhotosActions.types.createPhoto)
    .pipe(
      map((action: PhotosActions.CreatePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        this.snackbar.open('Uploading photo', 'OK');
        return this.http.post(config.endpoints.createPhoto.replace(':storyNumber', `${payload.story.id}`), payload.photo)
          .pipe(
            map((res: any) => new PhotosActions.CreatePhotoSuccess({id: res.id, photo: payload.photo})),
            catchError((err: HttpErrorResponse) => of(new PhotosActions.CreatePhotoFail(err)))
          );
      })
    );

  @Effect()
  deletePhoto$: Observable<Action> = this.actions$
    .ofType(PhotosActions.types.deletePhoto)
    .pipe(
      map((action: PhotosActions.DeletePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        const tmpUrl = config.endpoints.deletePhoto.replace(':storyNumber', `${payload.story.id}`);
        const url = tmpUrl.replace(':photoNumber', `${payload.photo.id}`);
        return this.http.delete(url)
          .pipe(
            map((res: any) => new PhotosActions.DeletePhotoSuccess(payload.photo)),
            catchError((err: HttpErrorResponse) => of(new PhotosActions.DeletePhotoFail(err)))
          );
      })
    );

  @Effect()
  loadPhotoList$: Observable<Action> = this.actions$
    .ofType(PhotosActions.types.loadPhotoList)
    .pipe(
      map((action: PhotosActions.LoadPhotoList) => action.payload),
      switchMap((payload: Story) => {
        return this.http.get(config.endpoints.loadPhotoList.replace(':storyNumber', `${payload.id}`))
          .pipe(
            map((res: any) => new PhotosActions.LoadPhotoListSuccess(res.photos.map(data => {
              return Photo.deserialize(data);
            }))),
            catchError((err: HttpErrorResponse) => of(new PhotosActions.LoadPhotoListFail(err)))
          );
      })
    );

  @Effect()
  updatePhoto$: Observable<Action> = this.actions$
    .ofType(PhotosActions.types.updatePhoto)
    .pipe(
      map((action: PhotosActions.UpdatePhoto) => action.payload),
      switchMap((payload: PhotoActionPayload) => {
        const tmpUrl = config.endpoints.updatePhoto.replace(':storyNumber', `${payload.story.id}`);
        const url = tmpUrl.replace(':photoNumber', `${payload.photo.id}`);
        return this.http.put(url, payload.photo)
          .pipe(
            map((res: any) => new PhotosActions.UpdatePhotoSuccess(payload.photo)),
            catchError((err: HttpErrorResponse) => of(new PhotosActions.UpdatePhotoFail(err)))
          );
      })
    );

  constructor(private actions$: Actions, private http: HttpClient, private snackbar: MatSnackBar) {
  }
}
