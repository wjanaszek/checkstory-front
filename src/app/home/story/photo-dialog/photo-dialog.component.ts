import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cs-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  photo: Photo;
  title: string;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<PhotoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
  }

  ngOnInit(): void {
  }

  clearFile(): void {
    this.fileInput.nativeElement.value = '';
  }

  onFileChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length === 1) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.photo = new Photo();
        this.photo.createDate = file.createDate ? file.createDate : new Date();
        this.photo.content = reader.result.split(',')[1];
        this.photo.imageType = file.type.split('/')[1];
      };
    }
  }

  upload(): void {
    this.dialogRef.close(this.photo);
  }

}
