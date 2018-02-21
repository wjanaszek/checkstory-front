import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule, MatSlideToggleModule,
  MatSnackBarModule,
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
import { ComparePhotosFailType } from './enums/compare-photos-fail-type.enum';

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
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
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
