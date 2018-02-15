import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EntryComponent } from './entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { ValidationService } from './validation/validation.service';
import { StoreModule } from '@ngrx/store';
import { entryReducer } from './store/entry.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EntryEffects } from './store/entry.effects';

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule,
    SharedModule,
    StoreModule.forFeature('entry', entryReducer),
    EffectsModule.forRoot([
      EntryEffects
    ])
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    EntryComponent,
    OverviewComponent
  ],
  exports: [
    EntryRoutingModule
  ],
  providers: [
    ValidationService
  ]
})
export class EntryModule { }
