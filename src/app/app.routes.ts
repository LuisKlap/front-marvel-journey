import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: LoginComponent
      },
      {
        path: 'verification-code',
        component: LoginComponent
      },
      {
        path: 'reset-password',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: LoginComponent
      }
    ]
  }
];
