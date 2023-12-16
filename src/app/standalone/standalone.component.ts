import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { passwordMatchValidator } from '../directives/password-match.directive';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './standalone.component.html'
})
export class StandaloneComponent implements OnInit {
  LOGIN_VIEW = 'login';
  REGISTER_VIEW = 'register';

  view: string = this.LOGIN_VIEW;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    confirmpassword: new FormControl('')
  });

  ngOnInit () {
    this.form.controls.password.addValidators(passwordMatchValidator(this.form.controls.confirmpassword));
    this.form.controls.confirmpassword.addValidators(passwordMatchValidator(this.form.controls.password));
  }
  
  onViewToggle ( view: string = this.LOGIN_VIEW ) {
    this.view = view;

    this.form.controls.name[view === this.REGISTER_VIEW ? 'addValidators' : 'removeValidators'](Validators.required);
    this.form.controls.confirmpassword[view === this.REGISTER_VIEW ? 'addValidators' : 'removeValidators'](Validators.required);
  }

  onComparePass ( compareControl: FormControl ) {
    compareControl.markAsDirty();
    compareControl.markAsTouched();
    compareControl.updateValueAndValidity();
  }

  onLogin () {
    console.log(this.form.valid);
    console.log(this.form.value);
  }
  onRegister () {
    console.log(this.form.valid);
    console.log(this.form.value);
  }
}
