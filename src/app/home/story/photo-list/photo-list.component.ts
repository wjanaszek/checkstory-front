import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { MatDialog } from '@angular/material';
import { PhotoDialogComponent } from '../photo-dialog/photo-dialog.component';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { PhotoPreviewComponent } from '../photo-preview/photo-preview.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cs-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  @Input()
  photosLoading: boolean;
  @Output()
  addPhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output()
  deletePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output()
  updatePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  menuPhoto: Photo;
  comparePhotos: boolean;
  comparePhotosControl: FormControl;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog) {
  }

  private _photos: Photo[];

  get photos(): Photo[] {
    return this._photos;
  }

  @Input()
  set photos(photos: Photo[]) {
    if (photos && photos.length) {
      this._photos = photos;
    }
  };

  ngOnInit(): void {
    this.comparePhotosControl = new FormControl(false);

    this.comparePhotosControl.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        this.comparePhotos = value;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCheckboxChange(event): void {
    console.log(event);
    event = event || window.event;
    if (event) {
      event.stopPropagation();
    }
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

  openPreview(photo: Photo, event): void {
    this.dialog.open(PhotoPreviewComponent, {
      data: {
        photo: photo
      }
    });
  }


}
