import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Story } from '../../../shared/models/story.model';
import { config } from '../../../config';
import { of } from 'rxjs/observable/of';
import { StoryActions } from './story.actions';

@Injectable()
export class StoryEffects {

  // @TODO move this to photos effects
  // @Effect()
  // loadPhotoList$: Observable<Action> = this.actions$
  //   .ofType(StoryActions.types.loadPhotoList)
  //   .pipe(
  //     map((action: StoryActions.LoadPhotoList) => action.payload),
  //     switchMap((payload: Story) => {
  //       return this.http.get(config.endpoints.loadPhotoList.replace(':storyNumber', `${payload.id}`))
  //         .pipe(
  //           map((res: LoadPhotoListPayload) => new StoryActions.LoadPhotoListSuccess(res)),
  //           catchError((err: HttpErrorResponse) => of(new StoryActions.LoadPhotoListFail(err)))
  //         );
  //     })
  //   );

  @Effect()
  loadStoryList$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.loadStoryList)
    .pipe(
      switchMap(() => {
        return this.http.get(config.endpoints.loadStoryList)
          .pipe(
            map((res: any[]) => new StoryActions.LoadStoryListSuccess(res.map(data => {
              return Story.deserialize(data);
            }))),
            catchError((err: HttpErrorResponse) => of(new StoryActions.LoadStoryListFail(err)))
          );
      })
    );

  @Effect()
  selectStory$: Observable<Action> = this.actions$
    .ofType(StoryActions.types.selectStory)
    .pipe(
      map((action: StoryActions.SelectStory) => action.payload),
      switchMap((payload: Story) => of(new StoryActions.LoadPhotoList(payload)))
    );

  constructor(private actions$: Actions, private http: HttpClient) {
  }

}