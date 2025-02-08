import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { SignInComponent } from './features/auth/components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './features/auth/components/forgot-password/forgot-password.component';
import { SignUpComponent } from './features/auth/components/sign-up/sign-up.component';
import { VerificationCodeComponent } from './features/auth/components/verification-code/verification-code.component';
import { ResetPasswordComponent } from './features/auth/components/reset-password/reset-password.component';
import { HomeComponent } from './features/home/components/home/home.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  // {
  //   path: 'auth', component: AuthComponent, children: [
  //     { path: 'sign-in', component: SignInComponent },
  //     { path: 'sign-up', component: SignUpComponent },
  //     { path: 'forgot-password', component: ForgotPasswordComponent },
  //     { path: 'verification-code', component: VerificationCodeComponent },
  //     { path: 'reset-password', component: ResetPasswordComponent },
  //   ]
  // },
  { path: 'home', component: HomeComponent },
  // { path: '**', redirectTo: 'auth/sign-in' }
];