import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Shared module should only contain declarations and exports of components used in whole application. No service providers
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCard,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [],
  exports: [
    MatCard
  ]
})
export class SharedModule {
}
