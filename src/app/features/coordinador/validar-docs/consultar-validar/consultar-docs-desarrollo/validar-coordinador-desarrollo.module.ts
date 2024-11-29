import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ValidarCoordinadorDesarrolloComponent } from './validar-coordinador-desarrollo.component';

const routes: Routes = [
  { path: '', component: ValidarCoordinadorDesarrolloComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ValidarCoordinadorDesarrolloModule {}
