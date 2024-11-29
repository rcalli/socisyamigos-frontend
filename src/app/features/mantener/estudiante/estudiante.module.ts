import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {EstudianteComponent} from './estudiante.component';

const routes: Routes = [
  { path: '', component: EstudianteComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class EstudianteModule {

}
