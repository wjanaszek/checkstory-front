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
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoDialogComponent } from './photo-dialog/photo-dialog.component';
import { PhotoPreviewComponent } from './photo-preview/photo-preview.component';
import { PhotoCompareComponent } from './photo-compare/photo-compare.component';
import { StoryDetailGuard } from './story-detail/story-detail-guard/story-detail.guard';

@NgModule({
  imports: [
    CommonModule,
    StoryRoutingModule,
    SharedModule
  ],
  declarations: [
    PhotoDialogComponent,
    PhotoListComponent,
    StoryComponent,
    StoryDetailComponent,
    StoryListComponent,
    StoryDialogComponent,
    StoryFormComponent,
    PhotoPreviewComponent,
    PhotoCompareComponent,
  ],
  entryComponents: [
    PhotoDialogComponent,
    PhotoPreviewComponent,
    StoryDialogComponent
  ],
  providers: [
    StoryDetailGuard,
    StoryGuard,
  ]
})
export class StoryModule {
}
