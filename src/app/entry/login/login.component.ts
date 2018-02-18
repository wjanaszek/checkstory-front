import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EntryState } from '../store/entry/entry.reducer';
import { EntryActions } from '../store/entry/entry.actions';
import { getLoginError } from '../store/entry.store';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  apiError: Observable<string>;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<EntryState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.apiError = this.store.select(getLoginError);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    this.store.dispatch(new EntryActions.Login(this.form.value));
  }

}
