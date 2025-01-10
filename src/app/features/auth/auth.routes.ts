import { Routes } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { VerificationCodeComponent } from "./components/verification-code/verification-code.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

export const authRoutes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verification-code', component: VerificationCodeComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
  ];