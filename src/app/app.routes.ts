import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, children: [
    { path: 'sign-in', component: AuthComponent },
    // { path: 'sign-up', component: SignUpComponent },
    // { path: 'forgot-password', component: ForgotPasswordComponent },
    // { path: 'verification-code', component: VerificationCodeComponent },
    // { path: 'reset-password', component: ResetPasswordComponent },
  ]},
  { path: '**', redirectTo: 'auth/sign-in' } // Rota de fallback
];