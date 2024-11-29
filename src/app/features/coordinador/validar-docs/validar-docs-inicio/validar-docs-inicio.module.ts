import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ValidarDocsInicioComponent } from './validar-docs-inicio.component';

const routes: Routes = [
  { path: '', component: ValidarDocsInicioComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ValidarDocsInicioModule {}
