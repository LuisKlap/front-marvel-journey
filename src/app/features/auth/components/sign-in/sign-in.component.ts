import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'; // Importa o Router

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  @Output() navigate = new EventEmitter<{ step: 'sign-up' | 'forgot-password', email?: string }>();

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private cookieService: CookieService, private router: Router) { // Adiciona o Router no construtor
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.signInForm.patchValue({ email: rememberedEmail, rememberMe: true });
    }
  }

  onSignIn(): void {
    if (this.signInForm.valid) {
      const { email, password, rememberMe } = this.signInForm.value;
      this.authService.signIn(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.cookieService.set('token', response.token);
          this.cookieService.set('refresh-token', response.refreshToken);
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          this.router.navigate(['/home']); // Redireciona para HomeComponent após o login bem-sucedido
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
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