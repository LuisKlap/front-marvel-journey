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

    this.authService.verificationCode(data).subscribe({
      next: () => {
        this.isLoading = false;
        if (this.origin === 'sign-up') {
          this.navigate.emit({ step: 'sign-in'});
        } else if (this.origin === 'forgot-password') {
          this.navigate.emit({ step: 'reset-password'});
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Verification error:', error);
        this.errorMessage = 'Verification failed. Please try again.';
      }
    });
  }

  onBack() {
    if (this.origin === 'sign-up') {
      this.navigate.emit({ step: 'sign-up'});
    } else if (this.origin === 'forgot-password') {
      this.navigate.emit({ step: 'forgot-password'});
    }
  }
}