import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../validation/validation.service';
import { EntryState } from '../store/entry.reducer';
import { Store } from '@ngrx/store';
import { EntryActions } from '../store/entry.actions';

@Component({
  selector: 'cs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<EntryState>, private validation: ValidationService) { }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   login: ['', [Validators.required], this.validation.checkLogin.bind(this)],
    //   email: ['', [Validators.required, Validators.email], this.validation.checkEmail],
    //   password: ['', [Validators.required]],
    //   confirmPassword: ['', [Validators.required]]
    // }, {
    //   validator: this.validation.checkPasswords.bind(this)
    // });
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.validation.checkPasswords.bind(this)
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    this.store.dispatch(new EntryActions.Register(this.form.value));
  }

}
