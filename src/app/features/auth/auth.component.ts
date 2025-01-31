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
  origin: 'sign-up' | 'forgot-password' = 'sign-up';

  constructor(private router: Router) { }

  navigateTo(event: { step: 'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password', email?: string }): void {
    const { step, email } = event;
    if (step === 'verification-code') {
      this.origin = this.currentStep === 'sign-up' ? 'sign-up' : 'forgot-password';
    }
    this.currentStep = step;
    this.router.navigate([`/auth/${step}`], { queryParams: { email } });
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}