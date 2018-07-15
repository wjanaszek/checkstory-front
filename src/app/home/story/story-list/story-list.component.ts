import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStoryList, getStoryListLoading, State } from '../../store/home.store';
import { Story } from '../../../shared/models/story.model';
import { Observable } from 'rxjs/Observable';
import { StoryActions } from '../../store/story/story.actions';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';
import { Subject } from 'rxjs/Subject';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'cs-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit, OnDestroy {

  menuStory: Story;
  storyList: Observable<Story[]>;
  storyListLoading: Observable<boolean>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private router: Router, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.storyList = this.store.select(getStoryList);
    this.storyListLoading = this.store.select(getStoryListLoading);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addStory(): void {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
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

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.store.dispatch(new StoryActions.DeleteStory(story));
      }
    });
  }

  details(story: Story): void {
    this.router.navigateByUrl('home/story/:id'.replace(':id', `${story.id}`));
  }

  edit(story: Story): void {
    this.router.navigate(['home/story/:id'.replace(':id', `${story.id}`)], {queryParams: {edit: true}});
  }

  menuButtonClicked(story: Story, event): void {
    this.menuStory = story;
    if (event) {
      event.stopPropagation();
    }
  }

}
