import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearCartaComponent } from './crear-carta.component';

const routes: Routes = [
  { path: '', component: CrearCartaComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class CrearCartaModule {}
