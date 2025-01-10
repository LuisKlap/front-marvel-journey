import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, EventEmitter, Output, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification-code',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verification-code.component.html',
  styleUrl: './verification-code.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent {
  
  @Output() navigate = new EventEmitter<'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password'>();
  

}
