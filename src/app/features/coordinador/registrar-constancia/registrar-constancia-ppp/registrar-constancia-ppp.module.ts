import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarConstanciaPppComponent } from './registrar-constancia-ppp.component';

const routes: Routes = [
  { path: '', component: RegistrarConstanciaPppComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RegistrarConstanciaPppModule {}
