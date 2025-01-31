export interface User {
  email: string;
  password: string;
  confirmPassword?: string;
  termsAccepted: boolean;
  updates: boolean;
  device: string;
  ipAddress: string;
  userAgent: string;
}