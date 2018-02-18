import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/home.store';
import { EffectsModule } from '@ngrx/effects';
import { StoryEffects } from './store/story/story.effects';
import { PhotosEffects } from './store/photos/photos.effects';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('home', reducers),
    EffectsModule.forRoot([
      PhotosEffects,
      StoryEffects
    ])
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule {
}
