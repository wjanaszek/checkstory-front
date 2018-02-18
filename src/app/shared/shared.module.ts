import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

/**
 * Shared module should only contain declarations and exports of components used in whole application. No service providers
 */
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJDewrUuhZjOZ4uA-9LZ87ldZUWFHRtP0'
    }),
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    PageNotFoundComponent,
    ToolbarComponent,
    ConfirmDialogComponent,
    MapComponent,
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    PageNotFoundComponent,
    ReactiveFormsModule,
    RouterModule,
    ToolbarComponent,
    MapComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule {
}
