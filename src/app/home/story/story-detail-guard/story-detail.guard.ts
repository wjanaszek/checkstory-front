import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getStoryState, State } from '../../store/home.store';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { StoryActions } from '../../store/story/story.actions';

@Injectable()
export class StoryDetailGuard implements CanActivate {

  constructor(private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.loadSelectedStory(route)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  loadSelectedStory(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store.select(getStoryState)
      .pipe(
        tap((data: any) => {
          if (!data.selectedStory) {
            this.store.dispatch(new StoryActions.SelectStory(route.params['id']));
          }
        })
      );
  }
}
