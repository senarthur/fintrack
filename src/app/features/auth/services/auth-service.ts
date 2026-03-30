import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../../core/model/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'https://fintrack-z5n9.onrender.com/api/auth';

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.name);
        this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  register(data: RegisterRequest) {
    return this.http.post<void>(`${this.API_URL}/register`, data).pipe(
      tap(res => {
        console.log("Registrado com sucesso", res);
        this.router.navigate(['/'])
      })
    )
  }
}
