import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { Store } from '@ngrx/store';
import { getPhotosCompareResult, getPhotosComparing, State } from '../../store/home.store';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PhotoPreviewComponent } from '../photo-preview/photo-preview.component';
import { MatDialog } from '@angular/material';
import { config } from '../../../config';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cs-photo-compare',
  templateUrl: './photo-compare.component.html',
  styleUrls: ['./photo-compare.component.scss']
})
export class PhotoCompareComponent implements OnInit, OnDestroy {

  @Input()
  photos: Photo[] = [];

  @Output()
  sensitivityChange: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  targetSizeChange: EventEmitter<number> = new EventEmitter<number>();

  sensitivity = config.compareOptions.defaultSensitivity;
  maxDistance = config.compareOptions.maxDistance;
  maxTargetSize = config.compareOptions.maxTargetSize;
  minDistance = config.compareOptions.minDistance;
  minTargetSize = config.compareOptions.minTargetSize;
  photosCompareResult: Photo;
  photosComparing: boolean;
  sensitivityControl = new FormControl(this.sensitivity, [Validators.required, Validators.min(this.minDistance), Validators.max(this.maxDistance)]);
  targetSize = config.compareOptions.defaultTargetSize;
  targetSizeControl = new FormControl(this.targetSize, [Validators.required, Validators.min(this.minTargetSize), Validators.max(this.maxTargetSize)]);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.select(getPhotosComparing)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.photosComparing = data;
      });

    this.store.select(getPhotosCompareResult)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if (data) {
          this.photosCompareResult = data;
        }
      });

    this.sensitivityControl.valueChanges
      .pipe(
        debounceTime(config.inputDebounceTime),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.sensitivity = value;
        this.sensitivityChange.emit(value);
      });

    this.targetSizeControl.valueChanges
      .pipe(
        debounceTime(config.inputDebounceTime),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.targetSize = value;
        this.targetSizeChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openPreview(photo: Photo): void {
    this.dialog.open(PhotoPreviewComponent, {
      data: {
        photo: photo
      }
    });
  }

  onSensitivityChange(event): void {
    this.sensitivityChange.emit(event.value);
    this.sensitivityControl.setValue(event.value);
  }

  onTargetSizeChange(event): void {
    this.targetSizeChange.emit(event.value);
    this.targetSizeControl.setValue(event.value);
  }

}
