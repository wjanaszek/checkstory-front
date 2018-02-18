import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';

@Component({
  selector: 'cs-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.scss']
})
export class StoryDialogComponent implements OnInit {

  formValue: StoryFormPayload;

  constructor(public dialogRef: MatDialogRef<StoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onFormValueChange(event: StoryFormPayload): void {
    this.formValue = event;
  }

  submit(): void {
    this.dialogRef.close(this.formValue);
  }
}
