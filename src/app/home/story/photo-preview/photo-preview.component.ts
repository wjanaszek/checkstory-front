import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Photo } from '../../../shared/models/photo.model';

@Component({
  selector: 'cs-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss']
})
export class PhotoPreviewComponent implements OnInit {

  photo: Photo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.photo = data.photo;
  }

  ngOnInit(): void {
  }

}
