import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStoryList, State } from '../../store/home.store';
import { Story } from '../../../shared/models/story.model';
import { Observable } from 'rxjs/Observable';
import { StoryActions } from '../../store/story/story.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'cs-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit, OnDestroy {

  menuStory: Story;
  stories: Observable<Story[]>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private router: Router, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.stories = this.store.select(getStoryList);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addStory(): void {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.store.dispatch(new StoryActions.CreateStory(data));
      });
  }

  delete(story: Story): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'DELETE STORY',
        message: 'Are you sure?',
        confirmText: 'DELETE STORY'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        if (data) {
          this.store.dispatch(new StoryActions.DeleteStory(story));
        }
      });
  }

  details(story: Story): void {
    this.store.dispatch(new StoryActions.SelectStory(story));
    this.router.navigateByUrl('home/story/:id'.replace(':id', `${story.id}`));
  }

  edit(story: Story): void {
    // @TODO pass editing value with URL
    this.store.dispatch(new StoryActions.SelectStory(story));
    this.router.navigateByUrl('home/story/:id'.replace(':id', `${story.id}`));
  }

  menuButtonClicked(story: Story, event): void {
    this.menuStory = story;
    if (event) {
      event.stopPropagation();
    }
  }

}
