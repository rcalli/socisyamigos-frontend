import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarCrearCartaComponent } from './consultar-crear-carta.component';

const routes: Routes = [
  { path: '', component: ConsultarCrearCartaComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConsultarCrearCartaModule {}
