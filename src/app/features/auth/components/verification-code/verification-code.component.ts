import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
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

    const { code } = this.verificationCodeForm.value;
    const data: UserVerificationCode = { email: this.email, code };
    console.log('Verifying code:', data);
    var response = this.authService.verificationCode(data).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('Verification successful');
        if (this.origin === 'sign-up') {
          this.navigate.emit({ step: 'sign-in'});
        } else if (this.origin === 'forgot-password') {
          this.navigate.emit({ step: 'reset-password'});
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Verification error:', error);
        if (error.status === 404) {
          this.errorMessage = 'User not found. Please check your email and try again.';
        } else if (error.status === 400) {
          const errorCode = error.error.error;
          if (errorCode === 'INVALID_VERIFICATION_CODE') {
            this.errorMessage = 'Invalid verification code. Please try again. <a href="#" (click)="resendCode($event)">Send again</a>';
          } else if (errorCode === 'EXPIRED_VERIFICATION_CODE') {
            this.errorMessage = 'Verification code expired. Please request a new code. <a href="#" (click)="resendCode($event)">Send again</a>';
          } else {
            this.errorMessage = 'Verification failed. Please try again.';
          }
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
    console.log('Response:', response);
  }

  onBack() {
    if (this.origin === 'sign-up') {
      this.navigate.emit({ step: 'sign-up'});
    } else if (this.origin === 'forgot-password') {
      this.navigate.emit({ step: 'forgot-password'});
    }
  }

  resendCode(event: Event) {
    event.preventDefault();
    if (this.verificationCodeForm.invalid) {
      this.errorMessage = 'Please enter a valid code before resending.';
      return;
    }

    this.isLoading = true;
    const { code } = this.verificationCodeForm.value;
    const data: UserVerificationCode = { email: this.email, code };

    this.authService.verificationCode(data).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('Verification code resent successfully');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error resending verification code:', error);
        this.errorMessage = 'Failed to resend verification code. Please try again later.';
      }
    });
  }
}