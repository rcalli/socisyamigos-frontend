import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionComponent } from './evaluacion.component';

const routes: Routes = [
  { path: '', component: EvaluacionComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class EvaluacionModule {}
