import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { RegisterRequest } from '../../../core/model/auth.interface';
import { passwordsMatchValidator } from '../utils/validators.form';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Button } from '../../../shared/components/button/button';

class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;

      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)) ||
             !!(control && control.parent?.hasError('passwordMismatching') && control.touched);
  }
}

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {

  private _formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService)
  private snackBar = inject(MatSnackBar);

  matcher = new ConfirmPasswordErrorStateMatcher();

  signUpForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  }, { validators: passwordsMatchValidator })

  onSubmit() {
    if(this.signUpForm.invalid) {
      this.snackBar.open("Formulário inválido! Confira os dados e tente novamente.","", {
        duration: 2000
      });
      return;
    }

    localStorage.removeItem('token');
    
    const data: RegisterRequest = {
      name: this.signUpForm.value.name || "",
      login: this.signUpForm.value.email || "",
      password: this.signUpForm.value.password || ""
    }

    this.authService.register(data).subscribe({
      next: () => {
        this.snackBar.open("Cadastro realizado com sucesso! Faça login para continuar.","", {
          duration: 2000
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open(err.error.message,"", {
          duration: 2000
        });
      }
    })
  }
}
