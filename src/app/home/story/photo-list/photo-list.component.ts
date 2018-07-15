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
  photoToCompare: EventEmitter<Photo> = new EventEmitter<Photo>();
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
    this._photos = photos;
  }

  ngOnInit(): void {
    this.comparePhotosControl = new FormControl(false);

    this.comparePhotosControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.comparePhotos = value;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onCheckboxChange(photo: Photo): void {
    this.photoToCompare.emit(photo);
  }

  delete(photo: Photo): void {
    this.deletePhoto.emit(photo);
  }

  menuButtonClicked(photo: Photo): void {
    this.menuPhoto = photo;
  }

  openEditPhotoDialog(menuPhoto: Photo): void {
    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: {
        title: 'Upload new photo'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
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


}
