import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StoryComponent, StoryDetailComponent]
})
export class StoryModule { }
