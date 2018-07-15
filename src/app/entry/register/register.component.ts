import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../validation/validation.service';
import { EntryState } from '../store/entry/entry.reducer';
import { Store } from '@ngrx/store';
import { EntryActions } from '../store/entry/entry.actions';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private store: Store<EntryState>, private validationService: ValidationService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required], this.validateUsernameNotTaken.bind(this)],
      email: ['', [Validators.required], this.validateEmailNotTaken.bind(this)],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.validationService.checkPasswords
    });
  }

  cancel(): void {
    this.router.navigateByUrl('entry');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsPristine();
      return;
    }

    this.store.dispatch(new EntryActions.Register(this.form.value));
    this.form.markAsPristine();
  }

  validateEmailNotTaken(control: AbstractControl): any {
    return this.validationService.emailAvailable(control.value)
      .pipe(map((res) => res ? {emailTaken: true} : null));
  }

  validateUsernameNotTaken(control: AbstractControl): any {
    return this.validationService.usernameAvailable(control.value)
      .pipe(map((res) => res ? {loginTaken: true} : null));
  }

}
