import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { getStoryState, State } from '../../../store/home.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { StoryActions } from '../../../store/story/story.actions';
import { Story } from '../../../../shared/models/story.model';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CompareGuard implements CanActivate {

  constructor(private router: Router, private store: Store<State>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.loadSelectedStoryFromStore(next.params['id'])
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }

  loadSelectedStoryFromStore(storyId: number): Observable<any> {
    return this.store.select(getStoryState)
      .pipe(
        tap((data: any) => {
          if (!data.selectedStory) {
            const story = new Story();
            story.id = storyId;
            this.store.dispatch(new StoryActions.LoadSelectedStory(story));
            this.router.navigateByUrl('home/story/' + `${storyId}`);
          }
        })
      );
  }
}
