import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSignIn(): void {
    if (this.signInForm.valid) {
      console.log('Logging in:', this.signInForm.value);
      // Aqui você faria a integração com o backend
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