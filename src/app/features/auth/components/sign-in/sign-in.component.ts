import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  @Output() navigate = new EventEmitter<{ step: 'sign-up' | 'forgot-password', email?: string }>();

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private cookieService: CookieService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSignIn(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.signIn(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.cookieService.set('token', response.token);
          this.cookieService.set('refresh-token', response.refreshToken);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  onSignUp(): void {
    this.navigate.emit({ step: 'sign-up' });
  }

  onForgotPassword(): void {
    const { email } = this.signInForm.value;
    this.navigate.emit({ step: 'forgot-password', email });
  }
}