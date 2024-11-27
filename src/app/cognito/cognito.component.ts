import { Component, inject } from '@angular/core';

import { CognitoService } from '../_services/cognito.service';

@Component({
  selector: 'app-cognito',
  standalone: true,
  imports: [],
  templateUrl: './cognito.component.html'
})
export class CognitoComponent {

  private auth = inject(CognitoService);
}
