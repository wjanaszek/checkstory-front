import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth-guard/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
  ]
})
export class CoreModule { }