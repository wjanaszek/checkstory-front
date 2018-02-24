import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { Store } from '@ngrx/store';
import { getPhotosCompareResult, getPhotosComparing, State } from '../../store/home.store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { PhotoPreviewComponent } from '../photo-preview/photo-preview.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cs-photo-compare',
  templateUrl: './photo-compare.component.html',
  styleUrls: ['./photo-compare.component.scss']
})
export class PhotoCompareComponent implements OnInit, OnDestroy {

  @Input()
  photos: Photo[] = [];

  photosCompareResult: Photo;
  photosComparing: boolean;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.select(getPhotosComparing)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.photosComparing = data;
      });

    this.store.select(getPhotosCompareResult)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        if (data) {
          this.photosCompareResult = data;
        }
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

}
