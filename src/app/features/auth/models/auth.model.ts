export interface UserRegister {
  email: string;
  password: string;
  confirmPassword?: string;
  termsAccepted: boolean;
  updates: boolean;
  device: string;
  ipAddress: string;
  userAgent: string;
}

export interface UserVerificationCode {
  email: string;
  code: string;
}

