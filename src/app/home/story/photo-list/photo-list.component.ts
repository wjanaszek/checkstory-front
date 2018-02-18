import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../../shared/models/photo.model';

@Component({
  selector: 'cs-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  @Input()
  photos: Photo[];

  @Output()
  addPhoto: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deletePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output()
  updatePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();

  constructor() { }

  ngOnInit(): void {
  }

}
