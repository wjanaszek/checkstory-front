import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getPhotoList,
  getPhotosLoading,
  getPhotosToCompare,
  getSelectedStory,
  getSelectedStoryLoading,
  State
} from '../../store/home.store';
import { Story } from '../../../shared/models/story.model';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';
import { StoryActions } from '../../store/story/story.actions';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../../shared/models/photo.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PhotoActions } from '../../store/photo/photo.actions';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { config } from '../../../config';

@Component({
  selector: 'cs-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit, OnDestroy {

  editing = false;
  story: Story;
  storyLoading: Observable<boolean>;
  photos: Observable<Photo[]>;
  photosLoading: Observable<boolean>;
  photosToCompare: Photo[];
  sensitivity = config.compareOptions.defaultSensitivity;
  targetSize = config.compareOptions.defaultTargetSize;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private location: Location, private route: ActivatedRoute, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.photos = this.store.select(getPhotoList);
    this.photosLoading = this.store.select(getPhotosLoading);
    this.storyLoading = this.store.select(getSelectedStoryLoading);

    this.route.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => this.editing = params.edit);

    this.store.select(getPhotosToCompare)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(photos => {
        if (photos) {
          this.photosToCompare = photos;
        }
      });

    this.store.select(getSelectedStory)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => this.story = s);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  comparePhotos(): void {
    this.store.dispatch(new PhotoActions.ComparePhotos({
      photos: this.photosToCompare,
      sensitivity: this.sensitivity,
      targetSize: this.targetSize
    }));
  }

  openAddPhotoDialog(): void {
    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: {
        title: 'Add photo'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.store.dispatch(new PhotoActions.CreatePhoto({photo: data, story: this.story}));
      }
    });
  }

  onDeletePhoto(photo: Photo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete photo',
        message: 'Are you sure you want to delete this photo?',
        confirmText: 'DELETE PHOTO'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new PhotoActions.DeletePhoto({photo: photo, story: this.story}));
      }
    });
  }

  onFormValueChange(event: StoryFormPayload): void {
    this.store.dispatch(new StoryActions.UpdateStory({...this.story, ...event}));
  }

  onPhotoToCompare(photo: Photo): void {
    this.store.dispatch(new PhotoActions.SetPhotoToCompare(photo));
  }

  onSensitivityChange(value: number): void {
    this.sensitivity = value;
  }

  onTargetSizeChange(value: number): void {
    this.targetSize = value;
  }

  onUpdatePhoto(photo: Photo): void {
    this.store.dispatch(new PhotoActions.UpdatePhoto({photo: photo, story: this.story}));
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    this.location.replaceState(`home/story/${this.story.id}`, `edit=${this.editing}`);
  }

}
