import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ValidarDocsDesarrolloComponent } from './validar-docs-desarrollo.component';

const routes: Routes = [
  { path: '', component: ValidarDocsDesarrolloComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ValidarDocsDesarrolloModule {}
