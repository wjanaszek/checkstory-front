import { Injectable } from '@angular/core';
import { Actions, Effect, EffectSources } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { PhotosActions } from './photos.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { config } from '../../../config';
import { Story } from '../../../shared/models/story.model';
import { of } from 'rxjs/observable/of';
import { Photo } from '../../../shared/models/photo.model';

@Injectable()
export class PhotosEffects {

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

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
