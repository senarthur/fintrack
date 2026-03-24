import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./features/dashboard/components/dashboard-home/dashboard-home').then(m => m.DashboardHome),
        canActivate: [authGuard]
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./features/dashboard/components/dashboard-details/dashboard-details').then(m => m.DashboardDetails),
        canActivate: [authGuard]
    },
    {
        path: 'add-transaction',
        loadComponent: () => import('./features/dashboard/components/dashboard-add-form/dashboard-add-form').then(m => m.DashboardAddForm),
        canActivate: [authGuard]
    },
    {
        path: '',
        loadChildren: () => import('./core/auth/.auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: "**",
        component: NotFound
    }
];
