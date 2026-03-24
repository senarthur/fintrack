import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { LoginRequest } from '../../../core/model/auth.interface';


@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ɵInternalFormsSharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  passwordType: "password" | "text" = "password";
  showPassword: boolean = false;

  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService)

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  hide = signal(true);
  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const data: LoginRequest = {
      login: this.loginForm.value.email || "",
      password: this.loginForm.value.password || ""
    }

    this.authService.login(data).subscribe({
      next: () => console.log('Logado'),
      error: () => console.log('Inválido', this.loginForm.value)
    })
  }

  onSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
