import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../../config';
import { LocationPayload } from '../../../shared/interfaces/location-payload.interface';

@Component({
  selector: 'cs-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.scss']
})
export class StoryDialogComponent implements OnInit {

  defaultPosition = { lat: config.WarsawLatitude, lng: config.WarsawLongitude };
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<StoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      notes: [''],
      latitude: [this.defaultPosition.lat, Validators.required],
      longitude: [this.defaultPosition.lng, Validators.required],
      createDate: [new Date(), Validators.required]
    });
  }

  onLocationChange(event: LocationPayload): void {
    Object.keys(event).forEach(key => {
      this.form.get(key).setValue(event[key]);
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    this.dialogRef.close(this.form.value);
  }
}
