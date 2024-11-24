import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ValidarCoordinadorComponent } from './validar-coordinador.component';

const routes: Routes = [
  { path: '', component: ValidarCoordinadorComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ValidarCoordinadorModule {}
