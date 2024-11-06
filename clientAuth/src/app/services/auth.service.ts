import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.success) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }
  getUserDetail() {
    const token = this.getToken();
    if (!token) return null;
    const decode: any = jwtDecode(token);
    const userDetail = {
      id: decode.nameid,
      name: decode.name,
      email: decode.email,
      roles: decode.role,
    };
    return userDetail;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decode = jwtDecode(token);
    const tokenExpired = Date.now() >= decode['exp']! * 1000;
    if (tokenExpired) this.logout();
    return tokenExpired;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || '';
  }
}