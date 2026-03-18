import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/dashboard/components/dashboard-home/dashboard-home').then(m => m.DashboardHome)
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./features/dashboard/components/dashboard-details/dashboard-details').then(m => m.DashboardDetails)
    },
    {
        path: 'add-transaction',
        loadComponent: () => import('./features/dashboard/components/dashboard-add-form/dashboard-add-form').then(m => m.DashboardAddForm)
    }
];
