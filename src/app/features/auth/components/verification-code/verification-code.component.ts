import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserVerificationCode } from '../../models/auth.model';

@Component({
  selector: 'app-verification-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent {
  @Input() origin: 'sign-up' | 'forgot-password' = 'sign-up';
  @Output() navigate = new EventEmitter<{ step: 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password', email?: string }>();
  verificationCodeForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  email: string = '';
  showResendButton = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService, private cdr: ChangeDetectorRef) {
    this.verificationCodeForm = this.fb.group({
      code: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onSubmit() {
    if (this.verificationCodeForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    const { code } = this.verificationCodeForm.value;
    const data: UserVerificationCode = { email: this.email, code };
    console.log('Verifying code:', data);

    this.authService.verificationCode(data).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('Verification successful');
        if (this.origin === 'sign-up') {
          this.navigate.emit({ step: 'sign-in' });
        } else if (this.origin === 'forgot-password') {
          this.navigate.emit({ step: 'reset-password' });
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Verification error:', error);
        if (error.status === 404) {
          this.errorMessage = 'User not found. Please check your email and try again.';
        } else if (error.status === 400) {
          const errorCode = error.error.error;
          if (errorCode === 'INVALID_VERIFICATION_CODE') {
            this.errorMessage = 'Invalid verification code.';
            this.showResendButton = true;
          } else if (errorCode === 'EXPIRED_VERIFICATION_CODE') {
            this.errorMessage = 'Verification code expired. Please request a new code.';
            this.showResendButton = true;
          } else {
            this.errorMessage = 'Verification failed.';
            this.showResendButton = true;
          }
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  onBack() {
    if (this.origin === 'sign-up') {
      this.navigate.emit({ step: 'sign-up' });
    } else if (this.origin === 'forgot-password') {
      this.navigate.emit({ step: 'forgot-password' });
    }
  }

  resendCode(event: Event) {
    event.preventDefault();

    this.errorMessage = '';
    this.cdr.markForCheck();

    this.authService.sendVerificationCode(this.email).subscribe({
      next: () => {
        console.log('Verification code resent successfully');
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error resending verification code:', error);
        this.errorMessage = 'Failed to resend verification code. Please try again later.';
        this.cdr.detectChanges();
      }
    });
  }
}