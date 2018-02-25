import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../../config';
import { Story } from '../../../shared/models/story.model';
import { LocationPayload } from '../../../shared/interfaces/location-payload.interface';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, skipWhile, takeUntil } from 'rxjs/operators';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'cs-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class StoryFormComponent implements OnInit, OnDestroy {

  @Input()
  editing: boolean;
  @Input()
  set story(story: Story) {
    if (story) {
      this._story = story;
      this.initForm(story);
    }
  }

  @Output()
  formValueChange: EventEmitter<StoryFormPayload> = new EventEmitter<StoryFormPayload>();

  defaultPosition = {lat: config.WarsawLatitude, lng: config.WarsawLongitude};
  form: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private _story: Story;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();

    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        skipWhile(() => this.form.invalid),
        debounceTime(250),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.formValueChange.emit(data);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get story(): Story {
    return this._story;
  }

  onLocationChange(event: LocationPayload): void {
    Object.keys(event).forEach(key => {
      this.form.get(key).setValue(event[key]);
    });
  }

  private initForm(story?: Story): void {
    this.form = this.fb.group({
      title: [story ? story.title : '', Validators.required],
      notes: [story ? story.notes : ''],
      latitude: [story ? story.latitude : this.defaultPosition.lat, Validators.required],
      longitude: [story ? story.longitude : this.defaultPosition.lng, Validators.required],
      createDate: [story ? story.createDate : new Date(), Validators.required]
    });
  }
}
