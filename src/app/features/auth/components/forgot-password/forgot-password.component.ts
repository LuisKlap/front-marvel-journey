import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  
  @Output() navigate = new EventEmitter<'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password'>();
  
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Lida com o envio do formulário
  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email } = this.forgotPasswordForm.value;

    // Simulação de envio de código (substitua pela chamada real ao backend)
    setTimeout(() => {
      this.isLoading = false;
      console.log('Código enviado para:', email);
      this.router.navigate(['/verification-code']); // Redireciona para a página do código
    }, 2000);
  }
}