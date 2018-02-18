import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPhotoList, getPhotosLoading, getSelectedStory, State } from '../../store/home.store';
import { Story } from '../../../shared/models/story.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';
import { StoryActions } from '../../store/story/story.actions';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../../shared/models/photo.model';

@Component({
  selector: 'cs-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  editing = false;
  story: Story;
  photos: Observable<Photo[]>;
  photosLoading: Observable<boolean>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.photos = this.store.select(getPhotoList);
    this.photosLoading = this.store.select(getPhotosLoading);

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

  onAddPhoto(event): void {
  }

  onDeletePhoto(event: Photo): void {
  }

  onFormValueChange(event: StoryFormPayload): void {
    this.store.dispatch(new StoryActions.UpdateStory({...this.story, ...event}));
  }

  onUpdatePhoto(event: Photo): void {
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

}
