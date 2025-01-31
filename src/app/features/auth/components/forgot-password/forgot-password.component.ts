import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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

    const { email } = this.forgotPasswordForm.value;

    setTimeout(() => {
      this.isLoading = false;
      console.log('Código enviado para:', email);
      this.navigate.emit({ step: 'verification-code', email });
    }, 2000);
  }

  onSignUp() {
    this.navigate.emit({ step: 'sign-up' });
  }

  onSignInWithGoogle() {
    console.log('Sign in with Google');
  }
}