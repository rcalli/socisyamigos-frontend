import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {EstadisticaComponent} from './estadistica.component';


const routes: Routes = [
  { path: '', component: EstadisticaComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class estadisticaModule {}
