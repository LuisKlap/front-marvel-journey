import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, EventEmitter, Output, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  
  @Output() navigate = new EventEmitter<'sign-in' | 'sign-up' | 'forgot-password' | 'verification-code' | 'reset-password'>();
  

}
