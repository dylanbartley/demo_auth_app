import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { passwordMatchValidator } from '../directives/password-match.directive';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [
    FormsModule,
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

    this.form.controls.confirmpassword.disable();
  }
  
  model: AuthModel = { email: '', password: '' };

  private authS = inject(AuthService);
  onViewToggle ( view: string = this.LOGIN_VIEW ) {
    this.view = view;

    this.form.controls.name[view === this.REGISTER_VIEW ? 'addValidators' : 'removeValidators'](Validators.required);
    this.form.controls.confirmpassword[view === this.REGISTER_VIEW ? 'addValidators' : 'removeValidators'](Validators.required);

    this.form.controls.confirmpassword[view === this.REGISTER_VIEW ? 'enable' : 'disable']();

    // reset main password validation
    this.form.controls.password.updateValueAndValidity();
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

  getPasswordError ( control: FormControl ) {
    if (control.hasError('required'))
      return 'Password is required'
    
    return control.hasError('passwordNotMatch') ? 'Passwords do not match' : '';
  }
}

export interface AuthModel {
  email: string;
  name?: string;
  password: string;
  password2?: string;
}