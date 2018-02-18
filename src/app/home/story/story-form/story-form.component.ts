import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../../config';
import { Story } from '../../../shared/models/story.model';
import { LocationPayload } from '../../../shared/interfaces/location-payload.interface';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, skipWhile, takeUntil } from 'rxjs/operators';
import { StoryFormPayload } from '../../../shared/interfaces/story-form-payload.interface';

@Component({
  selector: 'cs-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss']
})
export class StoryFormComponent implements OnInit, OnDestroy {

  @Input()
  editing: boolean;
  @Input()
  story: Story;

  @Output()
  formValueChange: EventEmitter<StoryFormPayload> = new EventEmitter<StoryFormPayload>();

  defaultPosition = {lat: config.WarsawLatitude, lng: config.WarsawLongitude};
  form: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.story ? this.story.title : '', Validators.required],
      notes: [this.story ? this.story.notes : ''],
      latitude: [this.story ? this.story.latitude : this.defaultPosition.lat, Validators.required],
      longitude: [this.story ? this.story.longitude : this.defaultPosition.lng, Validators.required],
      createDate: [this.story ? this.story.createDate : new Date(), Validators.required]
    });

    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        skipWhile(() => this.form.invalid),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => this.formValueChange.emit(data));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onLocationChange(event: LocationPayload): void {
    Object.keys(event).forEach(key => {
      this.form.get(key).setValue(event[key]);
    });
  }
}
