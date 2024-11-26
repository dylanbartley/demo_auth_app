import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './standalone.component.html'
})
export class StandaloneComponent {
  loading = false;

  LOGIN_VIEW = 'login';
  REGISTER_VIEW = 'register';

  view: string = this.LOGIN_VIEW;
  
  model: AuthModel = { email: '', password: '' };

  private authS = inject(AuthService);
}

export interface AuthModel {
  email: string;
  name?: string;
  password: string;
  password2?: string;
}