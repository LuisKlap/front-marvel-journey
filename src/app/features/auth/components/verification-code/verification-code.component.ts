import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  @Output() navigate = new EventEmitter<'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password'>();
  verificationCodeForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.verificationCodeForm = this.fb.group({
      code: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.verificationCodeForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { code } = this.verificationCodeForm.value;

    setTimeout(() => {
      this.isLoading = false;
      if (this.origin === 'sign-up') {
        this.navigate.emit('sign-in');
      } else if (this.origin === 'forgot-password') {
        this.navigate.emit('reset-password');
      }
    }, 2000);
  }

  onBack() {
    if (this.origin === 'sign-up') {
      this.navigate.emit('sign-up');
    } else if (this.origin === 'forgot-password') {
      this.navigate.emit('forgot-password');
    }
  }
}