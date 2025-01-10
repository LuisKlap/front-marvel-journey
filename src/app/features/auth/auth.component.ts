import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerificationCodeComponent,
    ResetPasswordComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  currentStep: 'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password' = 'sign-in';
  welcomeMessage: string = 'Welcome back! Please enter your details.';

  constructor(private router: Router) { }

  navigateTo(step: 'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password'): void {
    this.currentStep = step;
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}