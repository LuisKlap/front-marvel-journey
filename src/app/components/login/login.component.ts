import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentView: string = 'signIn'; // Gerenciar a visualização atual
  welcomeMessage: string = 'Welcome back! Please enter your details.';
  redButtonLabel: string = 'Sign In';
  showPasswordField: boolean = true;
  action: string = 'Sign up';
  isResetPassword: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Detecta mudanças na rota e atualiza o estado da visualização
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments.map(segment => segment.path).join('/');
      this.updateView(path);
    });

    // Verifica se a rota atual é válida, caso contrário, redireciona para a rota padrão de login
    const validPaths = ['forgot-password', 'verification-code', 'reset-password', 'sign-up'];
    const currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');
    if (!validPaths.includes(currentPath) && currentPath !== '') {
      this.router.navigate(['login']);
    }
  }

  updateView(path: string): void {
    switch (path) {
      case 'forgot-password':
        this.currentView = 'forgotPassword';
        this.welcomeMessage = 'Enter your email to get a verification code.';
        this.redButtonLabel = 'Send code';
        this.showPasswordField = false;
        this.action = 'Sign up';
        this.isResetPassword = true;
        break;
      case 'verification-code':
        this.currentView = 'verificationCode';
        this.welcomeMessage = 'Enter the code sent to your email.';
        this.redButtonLabel = 'Verify code';
        this.showPasswordField = false;
        break;
      case 'reset-password':
        this.currentView = 'resetPassword';
        this.welcomeMessage = 'Reset your password.';
        this.redButtonLabel = 'Reset password';
        this.showPasswordField = true;
        break;
      case 'sign-up':
        this.currentView = 'signUp';
        this.welcomeMessage = 'Welcome! Let’s create a new account.';
        this.redButtonLabel = 'Verify email';
        this.showPasswordField = true;
        this.action = 'Sign in';
        this.isResetPassword = false;
        break;
      default:
        this.currentView = 'signIn';
        this.welcomeMessage = 'Welcome back! Please sign in to continue.';
        this.redButtonLabel = 'Sign in';
        this.showPasswordField = true;
        this.action = 'Sign up';
        this.isResetPassword = false;
        break;
    }
  }

  onSubmit(): void {
    switch (this.currentView) {
      case 'forgotPassword':
        this.handleForgotPassword();
        break;
      case 'verificationCode':
        this.handleVerificationCode();
        break;
      case 'resetPassword':
        this.handleResetPassword();
        break;
      case 'signUp':
        this.handleSignUp();
        break;
      default:
        this.handleSignIn();
        break;
    }
  }

  onAction(): void {
    switch (this.currentView) {
      case 'signUp':
        this.goToLogin();
        break;
      default:
        this.goToSignUp();
        break;
    }
  }

  handleForgotPassword(): void {
    this.goToVerificationCode();
  }

  handleVerificationCode(): void {
    if (this.isResetPassword) {
      this.goToResetPassword();
    } else {
      this.goToLogin();
    }
  }

  handleResetPassword(): void {
    this.goToLogin();
  }

  handleSignUp(): void {
    this.goToVerificationCode();
  }

  handleSignIn(): void {
    // Lógica para "Sign In"
    console.log('Sign In');
  }

  // Navega para a tela "Forgot Password"
  goToForgotPassword(): void {
    this.router.navigate(['login', 'forgot-password']).then(() => {
      this.updateView('forgot-password');
    });
  }

  // Navega para a tela "Verification Code"
  goToVerificationCode(): void {
    this.router.navigate(['login', 'verification-code']).then(() => {
      this.updateView('verification-code');
    });
  }

  // Navega para a tela "Reset Password"
  goToResetPassword(): void {
    this.router.navigate(['login', 'reset-password']).then(() => {
      this.updateView('reset-password');
    });
  }

  // Navega para a tela "Sign Up"
  goToSignUp(): void {
    this.router.navigate(['login', 'sign-up']).then(() => {
      this.updateView('sign-up');
    });
  }

  // Retorna à tela de login
  goToLogin(): void {
    this.router.navigate(['login']).then(() => {
      this.updateView('signIn');
    });
  }
}