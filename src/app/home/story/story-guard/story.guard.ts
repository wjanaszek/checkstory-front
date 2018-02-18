import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getStoryState, State } from '../../store/home.store';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { StoryActions } from '../../store/story/story.actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StoryGuard implements CanActivate {

  constructor(private store: Store<State>) {
  }

  canActivate(): Observable<boolean> {
    return this.getDataFromStoreOrAPI()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  getDataFromStoreOrAPI(): Observable<any> {
    return this.store.select(getStoryState)
      .pipe(
        tap((data: any) => {
          if (!data.storyList.length) {
            this.store.dispatch(new StoryActions.LoadStoryList());
          }
        }),
        filter((data: any) => data.storyList.length),
        take(1)
      );
  }
}
