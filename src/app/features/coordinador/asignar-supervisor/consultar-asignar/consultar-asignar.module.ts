import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarAsignarComponent } from './consultar-asignar.component';

const routes: Routes = [
  { path: '', component: ConsultarAsignarComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConsultarAsignarModule {}
