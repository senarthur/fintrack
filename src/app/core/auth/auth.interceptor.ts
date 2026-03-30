import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../../features/auth/services/auth-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');

    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned);
    }

    return next(req);
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const router = inject(Router);
    const authService = inject(AuthService);
    const snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.logout();
                snackBar.open('Sua sessão expirou. Faça login novamente.', 'Entendido', {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
                router.navigate(['/']);
            }

            return throwError(() => error);
        })
    );
};