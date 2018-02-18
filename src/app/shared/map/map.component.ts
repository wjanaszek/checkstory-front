import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationPayload } from '../interfaces/location-payload.interface';

@Component({
  selector: 'cs-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input()
  latitude: number;
  @Input()
  longitude: number;
  @Input()
  markerDraggable: boolean;

  @Output()
  locationChange: EventEmitter<LocationPayload> = new EventEmitter<LocationPayload>();

  constructor() { }

  ngOnInit(): void {
  }

  onDragEnd(event): void {
    this.locationChange.emit({latitude: event.coords.lat, longitude: event.coords.lng});
  }

}
