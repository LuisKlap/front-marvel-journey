import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister, UserVerificationCode } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private authenticated = false;

  constructor(private http: HttpClient) { }

  register(user: UserRegister): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers, responseType: 'text' });
  }

  verificationCode(user: UserVerificationCode): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/verify-email`, user, { headers, responseType: 'text' });
  }

  sendVerificationCode(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/send-verification-code`, { email }, { headers, responseType: 'text' });
  }

  checkEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/check-email`, { email }, { headers });
  }

  signIn(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { headers });
  }

  setAuthenticated(authenticated: boolean): void {
    this.authenticated = authenticated;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}