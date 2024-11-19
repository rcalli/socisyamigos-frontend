import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EvaluacionComponent } from './components/mantener/evaluacion/evaluacion.component';
import { RequisitoComponent } from './components/mantener/requisito/requisito.component';

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
        path:'requisito',
        component:RequisitoComponent,
        title:'requisito'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
