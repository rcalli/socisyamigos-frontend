import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AsignarCronogramaAPppComponent } from './asignar-cronograma-a-ppp.component';

const routes: Routes = [
  { path: '', component: AsignarCronogramaAPppComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AsignarCronogramaPPPModule {}
