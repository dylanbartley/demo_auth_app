import { Routes } from '@angular/router';

import { StandaloneComponent } from './standalone/standalone.component';
import { CognitoComponent } from './cognito/cognito.component';

export const routes: Routes = [
    { path: 'standalone', component: StandaloneComponent },
    { path: 'cognito', component: CognitoComponent },
    { path: '',  redirectTo: '/standalone', pathMatch: 'full' }
];
