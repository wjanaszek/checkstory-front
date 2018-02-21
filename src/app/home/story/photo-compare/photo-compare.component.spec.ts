import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCompareComponent } from './photo-compare.component';

describe('PhotoCompareComponent', () => {
  let component: PhotoCompareComponent;
  let fixture: ComponentFixture<PhotoCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
