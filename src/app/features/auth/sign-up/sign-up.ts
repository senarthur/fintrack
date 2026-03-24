import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { RegisterRequest } from '../../../core/model/auth.interface';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {

  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService)

  signUpForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if(this.signUpForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    localStorage.removeItem('token');
    
    const data: RegisterRequest = {
      name: this.signUpForm.value.name || "",
      login: this.signUpForm.value.email || "",
      password: this.signUpForm.value.password || ""
    }

    this.authService.register(data).subscribe({
      next: () => console.log("Registrado com sucesso"),
      error: () => console.log("Não registrado", data)
    })
  }
}
