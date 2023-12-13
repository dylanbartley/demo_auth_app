import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './standalone.component.html'
})
export class StandaloneComponent {
  LOGIN_VIEW = 'login';
  REGISTER_VIEW = 'register';

  view: string = this.LOGIN_VIEW;
  
}
