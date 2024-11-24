import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarRegistrarComponent } from './consultar-registrar.component';

const routes: Routes = [
  { path: '', component: ConsultarRegistrarComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConsultarRegistrarModule {}
