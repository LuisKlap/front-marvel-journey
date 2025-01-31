import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IpService } from '../../../../services/ip.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTooltipModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  @Output() navigate = new EventEmitter<{ step: 'sign-in' | 'verification-code', email?: string }>();

  signUpForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private ipService: IpService, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue],
      updates: [false],
      device: [''],
      ipAddress: [''],
      userAgent: ['']
    });

    this.setDeviceDetails();
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  setDeviceDetails() {
    const deviceType = this.getDeviceType();
    this.signUpForm.patchValue({
      device: deviceType,
      userAgent: navigator.userAgent
    });

    this.ipService.getIpAddress().subscribe((data: any) => {
      this.signUpForm.patchValue({
        ipAddress: data.ip
      });
    });
  }

  getDeviceType(): string {
    const userAgent = navigator.userAgent;
    if (/mobile/i.test(userAgent)) {
      return 'mobile';
    }
    if (/tablet/i.test(userAgent)) {
      return 'tablet';
    }
    return 'web';
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { email, password, confirmPassword, terms, updates, device, ipAddress, userAgent } = this.signUpForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const userData = {
      email,
      password,
      termsAccepted: terms,
      updates,
      device,
      ipAddress,
      userAgent
    };

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('User registered successfully:', response);
        this.navigate.emit({ step: 'verification-code', email });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }

  onSignIn() {
    this.navigate.emit({ step: 'sign-in' });
  }

  onSignUpWithGoogle() {
    console.log('Sign up with Google');
  }
}