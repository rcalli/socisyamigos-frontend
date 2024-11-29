import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LineaCarreraComponent } from './linea-carrera.component';

const routes: Routes = [
  { path: '', component: LineaCarreraComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LineaCarreraModule {}
