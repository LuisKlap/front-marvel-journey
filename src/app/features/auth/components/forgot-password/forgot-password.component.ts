import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormBuilder, FormGroup, Validators],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
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
