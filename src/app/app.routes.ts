import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'evaluacion',
        loadChildren: () => import('././features/mantener/evaluacion/evaluacion.module').then(m => m.EvaluacionModule),
        canActivate: [AuthGuard],
        title: 'evaluacion'
    },
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
  ];

