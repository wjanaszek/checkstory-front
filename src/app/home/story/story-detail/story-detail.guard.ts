import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getStoryState, State } from '../../store/home.store';
import { catchError, first, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Story } from '../../../shared/models/story.model';
import { StoryActions } from '../../store/story/story.actions';

@Injectable()
export class StoryDetailGuard implements CanActivate {

  constructor(private store: Store<State>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const storyId: number = route.params['id'];
    return this.loadSelectedStory(storyId)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  loadSelectedStory(storyId: number): Observable<any> {
    return this.store.select(getStoryState)
      .pipe(
        first(),
        tap((data: any) => {
          if (!data.selectedStory || data.selectedStory.id !== storyId) {
            const story = new Story();
            story.id = storyId;
            this.store.dispatch(new StoryActions.LoadStory(story));
          }
        })
      );
  }
}
