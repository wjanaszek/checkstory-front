import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryRoutingModule } from './story-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StoryRoutingModule,
  ],
  declarations: [
    StoryComponent,
    StoryDetailComponent
  ]
})
export class StoryModule { }
