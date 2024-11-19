import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EvaluacionComponent } from './components/mantener/evaluacion/evaluacion.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title:'home'
    },
    {
        path:'evaluacion',
        component:EvaluacionComponent,
        title:'evaluacion'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
