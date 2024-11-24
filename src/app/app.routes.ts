import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    {
        path: 'consultar-estudiante',
        loadChildren: () => import('./features/consultar/estudiante/consultar-estudiante.module').then(m => m.ConsultarEstudianteModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'validar-coordinador-inicio',
        loadChildren: () => import('./features/coordinador/validar-docs/consultar-validar/consultar-docs-inicio/validar-coordinador.module').then(m => m.ValidarCoordinadorModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'validar-coordinador-desarrollo',
        loadChildren: () => import('./features/coordinador/validar-docs/consultar-validar/consultar-docs-desarrollo/validar-coordinador-desarrollo.module').then(m => m.ValidarCoordinadorDesarrolloModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'validar-docs-inicio/:idPPP',
        loadChildren: () => import('./features/coordinador/validar-docs/validar-docs-inicio/validar-docs-inicio.module').then(m => m.ValidarDocsInicioModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'validar-docs-desarrollo/:idPPP',
        loadChildren: () => import('./features/coordinador/validar-docs/validar-docs-desarrollo/validar-docs-desarrollo.module').then(m => m.ValidarDocsDesarrolloModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'consultar-asignar',
        loadChildren: () => import('./features/coordinador/asignar-supervisor/consultar-asignar/consultar-asignar.module').then(m => m.ConsultarAsignarModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'asignar-cronograma-ppp/:idPPP',
        loadChildren: () => import('./features/coordinador/asignar-supervisor/asignar-cronograma-a-ppp/asignar-cronograma-a-ppp.module').then(m => m.AsignarCronogramaPPPModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'asignar-supervisor-ppp/:idPPP',
        loadChildren: () => import('./features/coordinador/asignar-supervisor/asignar-supervisor-a-ppp/asignar-supervisor-a-ppp.module').then(m => m.AsignarSupervisorPPPModule),
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
    path: 'linea-carrera',
    loadChildren: () => import('./features/mantener/linea-carrera/linea-carrera.module').then(m => m.LineaCarreraModule),
    canActivate: [AuthGuard],
    title: 'linea-carrera'
  },
  {
    path: 'doc-inicio',
    loadChildren: () => import('./features/registrar-docs-inicio/registrar-docs-inicio.module').then(m => m.RegistrarDocsInicioModule),
    canActivate: [AuthGuard],
    title: 'doc-inicio'
  },

    {
        path: '**',
        redirectTo: 'consultar-estudiante'
    }
  ];

