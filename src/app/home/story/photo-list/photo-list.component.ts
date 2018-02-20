import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { MatDialog } from '@angular/material';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { PhotoPreviewComponent } from '../photo-preview/photo-preview.component';
import * as url from 'url';

@Component({
  selector: 'cs-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  @Input()
  set photos(photos: Photo[]) {
    if (photos && photos.length) {
      this._photos = photos;
    }
  };
  @Input()
  photosLoading: boolean;

  @Output()
  addPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output()
  deletePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output()
  updatePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();

  menuPhoto: Photo;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private _photos: Photo[];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  delete(photo: Photo): void {
    this.deletePhoto.emit(photo);
  }

  getUrlFromBase64(photo: Photo): any {
    return 'url(\'data:image/\'' + photo.imageType + ';base64,' + photo.content + ')';
  }

  menuButtonClicked(photo: Photo, event): void {
    this.menuPhoto = photo;
    if (event) {
      event.stopPropagation();
    }
  }

  openAddPhotoDialog(): void {
    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: {
        title: 'Add photo'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        if (data) {
          this.addPhoto.emit(data);
        }
      });
  }

  openEditPhotoDialog(menuPhoto: Photo): void {
    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: {
        title: 'Upload new photo'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        if (data) {
          const photo = {...data};
          photo.id = menuPhoto.id;
          this.updatePhoto.emit(photo);
        }
      });
  }

  openPreview(photo: Photo): void {
    this.dialog.open(PhotoPreviewComponent, {
      data: {
        photo: photo
      }
    });
  }

  get photos(): Photo[] {
    return this._photos;
  }

}
