import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { getStoryState, State } from '../../store/home.store';
import { catchError, map, switchMap, take, delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StoryDetailGuard implements CanActivate {

  constructor(private router: Router, private store: Store<State>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkSelectedStory()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => {
          this.router.navigateByUrl('home');
          return of(false);
        })
      );
  }

  checkSelectedStory(): Observable<any> {
    return this.store.select(getStoryState)
      .pipe(
        delay(250),
        map((data: any) => {
          if (!data.selectedStory) {
            throw new Error();
          }
        }),
        take(1)
      );
  }
}
