import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryRoutingModule } from './story-routing.module';
import { StoryListComponent } from './story-list/story-list.component';
import { SharedModule } from '../../shared/shared.module';
import { StoryDialogComponent } from './story-dialog/story-dialog.component';
import { StoryGuard } from './story-guard/story.guard';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryDetailGuard } from './story-detail-guard/story-detail.guard';
import { PhotoListComponent } from './photo-list/photo-list.component';

@NgModule({
  imports: [
    CommonModule,
    StoryRoutingModule,
    SharedModule
  ],
  declarations: [
    PhotoListComponent,
    StoryComponent,
    StoryDetailComponent,
    StoryListComponent,
    StoryDialogComponent,
    StoryFormComponent,
  ],
  entryComponents: [
    StoryDialogComponent
  ],
  providers: [
    StoryDetailGuard,
    StoryGuard,
  ]
})
export class StoryModule { }
