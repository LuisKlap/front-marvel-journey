import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  
  @Output() navigate = new EventEmitter<'sign-in' | 'verification-code'>();
  
  signUpForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue],
      updates: [false]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { email, password, confirmPassword } = this.signUpForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.isLoading = false;
      console.log('User registered successfully:', email);
      this.navigate.emit('verification-code');
    }, 2000);
  }

  onSignIn() {
    this.navigate.emit('sign-in');
  }

  onSignUpWithGoogle() {
    console.log('Sign up with Google');
  }
}