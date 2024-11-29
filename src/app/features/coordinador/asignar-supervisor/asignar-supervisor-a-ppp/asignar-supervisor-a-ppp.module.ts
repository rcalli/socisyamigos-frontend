import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AsignarSupervisorAPppComponent } from './asignar-supervisor-a-ppp.component';

const routes: Routes = [
  { path: '', component:  AsignarSupervisorAPppComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AsignarSupervisorPPPModule {}
