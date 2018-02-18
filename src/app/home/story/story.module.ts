import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryRoutingModule } from './story-routing.module';
import { StoryListComponent } from './story-list/story-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StoryRoutingModule,
    SharedModule
  ],
  declarations: [
    StoryComponent,
    StoryDetailComponent,
    StoryListComponent
  ]
})
export class StoryModule { }
