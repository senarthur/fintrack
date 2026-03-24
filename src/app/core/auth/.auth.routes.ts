import { Routes } from '@angular/router';
import { Login } from '../../features/auth/login/login';
import { SignUp } from '../../features/auth/sign-up/sign-up';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'sign-up',
        component: SignUp
    }
]