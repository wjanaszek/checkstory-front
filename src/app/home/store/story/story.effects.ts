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
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { PhotosActions } from '../photos/photos.actions';

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
        return this.http.delete(config.endpoints.deleteStory.replace(':storyNumber', `${payload.id}`))
          .pipe(
            map((res: any) => new StoryActions.DeleteStorySuccess(payload)),
            catchError((err: HttpErrorResponse) => of(new StoryActions.DeleteStoryFail(err)))
          );
      })
    );

  @Effect()
  loadSelectedStory$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.loadSelectedStory)
    .pipe(
      map((action: StoryActions.LoadSelectedStory) => action.payload),
      switchMap((payload: Story) => {
        this.store.dispatch(new PhotosActions.ClearPhotoList());
        return this.http.get(config.endpoints.loadSelectedStory.replace(':storyNumber', `${payload.id}`))
          .pipe(
            map((res: any) => new StoryActions.LoadSelectedStorySuccess(Story.deserialize(res))),
            catchError((err: HttpErrorResponse) => of(new StoryActions.LoadSelectedStoryFail(err)))
          );
      })
    );

  @Effect()
  loadSelectedStorySuccess$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.loadSelectedStorySuccess)
    .pipe(
      map((action: StoryActions.LoadSelectedStorySuccess) => action.payload),
      switchMap((payload: Story) => {
        this.store.dispatch(new PhotosActions.LoadPhotoList(payload));
        return new EmptyObservable();
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
        return this.http.put(config.endpoints.updateStory.replace(':storyNumber', `${payload.id}`), payload)
          .pipe(
            map((res: any) => {
              return new StoryActions.UpdateStorySuccess(Story.deserialize(res));
            }),
            catchError((err: HttpErrorResponse) => of(new StoryActions.UpdateStoryFail(err)))
          );
      })
    );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<State>) {
  }

}
