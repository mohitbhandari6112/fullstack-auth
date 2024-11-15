import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detial';
import { PassswordResetRequest } from '../interfaces/password-reset-request';
import { RequestChangePassword } from '../interfaces/chnage-password-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.success) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
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
    // if (tokenExpired) this.logout();
    return tokenExpired;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }
  getToken(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) {
      return null;
    }
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  }
  getRefreshToken(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (!user) {
      return null;
    }
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data);
  }

  getDetails(): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}account/detail`);
  }
  forgotPassword(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}account/forgot-password`,
      { email }
    );
  }
  resetPassword(data: PassswordResetRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}account/reset-password`,
      data
    );
  }
  changePassword(data: RequestChangePassword): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}account/change-password`,
      data
    );
  }

  getAll(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(`${this.apiUrl}account`);
  }

  refreshToken(data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}refresh-token`, data);
  }

  getRoles(): string[] | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  }
}
