import { CommonModule } from '@angular/common'; // Adicione esta linha
import { Component,  ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Adicione CommonModule aqui
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
  
  @Output() navigate = new EventEmitter<'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password'>();
  
  resetPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // Lida com o envio do formulário
  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { password, confirmPassword } = this.resetPasswordForm.value;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulação de redefinição de senha (substitua pela chamada real ao backend)
    setTimeout(() => {
      this.isLoading = false;
      console.log('Password reset successfully!');
      this.router.navigate(['/sign-in']); // Redireciona para a página de login
    }, 2000);
  }
}