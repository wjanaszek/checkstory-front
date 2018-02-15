import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './/home.component';
import { StoryComponent } from './story/story.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    StoryComponent
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
