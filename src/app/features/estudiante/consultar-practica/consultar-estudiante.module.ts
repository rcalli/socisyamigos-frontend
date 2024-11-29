import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarEstudianteComponent} from './consultar-estudiante.component';

const routes: Routes = [
  { path: '', component: ConsultarEstudianteComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConsultarEstudianteModule {}
