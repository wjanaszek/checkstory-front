import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Story } from '../../../shared/models/story.model';
import { config } from '../../../config';
import { of } from 'rxjs/observable/of';
import { StoryActions } from './story.actions';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';
import { State } from '../home.store';
import { PhotoActions } from '../photo/photo.actions';
import { ApiResponse } from '../../../shared/interfaces/api-response.interface';

@Injectable()
export class StoryEffects {

  @Effect()
  createStory$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.createStory)
    .pipe(
      map((action: StoryActions.CreateStory) => action.payload),
      switchMap((payload: StoryFormPayload) => {
        return this.http.post(config.endpoints.createStory, payload)
          .pipe(
            map((res: any) => new StoryActions.CreateStorySuccess(Story.deserialize(res))),
            catchError((err: HttpErrorResponse) => of(new StoryActions.CreateStoryFail(err)))
          );
      })
    );

  @Effect()
  deleteStory$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.deleteStory)
    .pipe(
      map((action: StoryActions.DeleteStory) => action.payload),
      switchMap((payload: Story) => {
        return this.http.delete(config.endpoints.deleteStory.replace(':id', `${payload.id}`))
          .pipe(
            map((res: any) => new StoryActions.DeleteStorySuccess(payload)),
            catchError((err: HttpErrorResponse) => of(new StoryActions.DeleteStoryFail(err)))
          );
      })
    );

  @Effect()
  loadStory$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.loadStory)
    .pipe(
      map((action: StoryActions.LoadStory) => action.payload),
      switchMap((payload: Story) => {
        this.store.dispatch(new PhotoActions.ClearPhotoList());
        return this.http.get<ApiResponse>(config.endpoints.loadStory.replace(':id', `${payload.id}`), {
          params: {
            withPhotos: 'true'
          }
        })
          .pipe(
            map((res: any) => {
              this.store.dispatch(new PhotoActions.LoadPhotoListSuccess(res.photos));
              return new StoryActions.LoadStorySuccess(Story.deserialize(res));
            }),
            catchError((err: HttpErrorResponse) => of(new StoryActions.LoadStoryFail(err)))
          );
      })
    );

  @Effect()
  loadStoryList$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.loadStoryList)
    .pipe(
      switchMap(() => {
        return this.http.get(config.endpoints.loadStoryList)
          .pipe(
            map((res: any[]) => {
              return new StoryActions.LoadStoryListSuccess(res.map(data => {
                return Story.deserialize(data);
              }));
            }),
            catchError((err: HttpErrorResponse) => of(new StoryActions.LoadStoryListFail(err)))
          );
      })
    );

  @Effect()
  updateStory$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.updateStory)
    .pipe(
      map((action: StoryActions.UpdateStory) => action.payload),
      switchMap((payload: Story) => {
        return this.http.put<ApiResponse>(config.endpoints.updateStory.replace(':id', `${payload.id}`), payload)
          .pipe(
            map((res: any) => new StoryActions.UpdateStorySuccess(Story.deserialize(res))),
            catchError((err: HttpErrorResponse) => of(new StoryActions.UpdateStoryFail(err)))
          );
      })
    );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<State>) {
  }

}
