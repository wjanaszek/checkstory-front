import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStoryList, State } from '../../store/home.store';
import { Story } from '../../../shared/models/story.model';
import { Observable } from 'rxjs/Observable';
import { StoryActions } from '../../store/story/story.actions';

@Component({
  selector: 'cs-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  stories: Observable<Story[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // @TODO move this to guard
    this.store.dispatch(new StoryActions.LoadStoryList());
    this.stories = this.store.select(getStoryList);
  }

}
