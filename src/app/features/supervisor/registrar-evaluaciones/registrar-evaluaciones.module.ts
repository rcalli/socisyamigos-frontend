import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarEvaluacionesComponent } from './registrar-evaluaciones.component';

const routes: Routes = [
  { path: '', component: RegistrarEvaluacionesComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RegistrarEvaluacionesModule {}
