import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getStoryState, State } from '../../../store/home.store';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { StoryActions } from '../../../store/story/story.actions';
import { Story } from '../../../../shared/models/story.model';

@Injectable()
export class StoryDetailGuard implements CanActivate {

  constructor(private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
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
            const story = new Story();
            story.id = route.params['id'];
            this.store.dispatch(new StoryActions.LoadSelectedStory(story));
          }
        })
      );
  }
}
