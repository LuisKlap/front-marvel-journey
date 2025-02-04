import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  
  @Output() navigate = new EventEmitter<{ step: 'sign-up' | 'verification-code', email?: string }>();
  
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    const { email } = this.forgotPasswordForm.value;

    this.authService.checkEmail(email).subscribe({
      next: () => {
        this.authService.sendVerificationCode(email).subscribe({
          next: () => {
            this.isLoading = false;
            console.log('Código enviado para:', email);
            this.navigate.emit({ step: 'verification-code', email });
            this.cdr.detectChanges();
          },
          error: () => {
            this.isLoading = false;
            this.errorMessage = 'Failed to send verification code. Please try again later.';
            this.cdr.detectChanges();
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 404) {
          this.errorMessage = 'User not found. Please check your email and try again.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  onSignUp() {
    this.navigate.emit({ step: 'sign-up' });
  }

  onSignInWithGoogle() {
    console.log('Sign in with Google');
  }
}