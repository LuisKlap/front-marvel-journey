import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  constructor(private http: HttpClient) {}

  getIpAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json');
  }
}