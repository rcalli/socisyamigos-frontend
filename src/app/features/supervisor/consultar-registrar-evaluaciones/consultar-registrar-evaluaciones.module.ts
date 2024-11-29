import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarRegistrarEvaluacionesComponent } from './consultar-registrar-evaluaciones.component';

const routes: Routes = [
  { path: '', component: ConsultarRegistrarEvaluacionesComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConsultarRegistrarEvaluacionesModule {}
