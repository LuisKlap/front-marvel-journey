import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
  
  @Output() navigate = new EventEmitter<{ step: 'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password', email?: string }>();
  
  resetPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { password, confirmPassword } = this.resetPasswordForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.resetPassword(password).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('Password reset successfully!');
        this.navigate.emit({ step: 'sign-in' });
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to reset password. Please try again later.';
        console.error('Reset password error:', error);
      }
    });
  }
}