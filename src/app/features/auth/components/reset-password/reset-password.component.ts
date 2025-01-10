import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormBuilder, FormGroup, Validators],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

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
