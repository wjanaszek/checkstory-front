import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelectedStory, State } from '../../store/home.store';
import { Story } from '../../../shared/models/story.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';
import { StoryActions } from '../../store/story/story.actions';

@Component({
  selector: 'cs-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  editing = false;
  story: Story;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getSelectedStory)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(s => this.story = s);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onFormValueChange(event: StoryFormPayload): void {
    this.store.dispatch(new StoryActions.UpdateStory({...this.story, ...event}));
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

}
