import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryComponent } from './story.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryGuard } from './story-guard/story.guard';
import { StoryDetailGuard } from './story-detail/story-detail-guard/story-detail.guard';

const routes: Routes = [
  {
    path: '',
    component: StoryComponent,
    canActivate: [StoryGuard],
    children: [
      {
        path: 'overview',
        component: StoryListComponent
      },
      {
        path: ':id',
        component: StoryDetailComponent,
        canActivate: [StoryDetailGuard],
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule {
}
