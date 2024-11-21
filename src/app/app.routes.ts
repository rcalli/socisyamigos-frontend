import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: 'consultar-estudiante',
        loadChildren: () => import('./features/consultar/estudiante/consultar-estudiante.module').then(m => m.ConsultarEstudianteModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'evaluacion',
        loadChildren: () => import('././features/mantener/evaluacion/evaluacion.module').then(m => m.EvaluacionModule),
        canActivate: [AuthGuard],
        title: 'evaluacion'
    },
    {
        path: 'requisito',
        loadChildren: () => import('././features/mantener/requisito/requisito.module').then(m => m.RequisitoModule),
        canActivate: [AuthGuard],
        title: 'requisito'
    },
    {
        path: 'login',
        loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: '**',
        redirectTo: 'consultar-estudiante'
    }
  ];

