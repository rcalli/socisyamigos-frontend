import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarDocsDesarrolloComponent,} from './registrar-docs-desarrollo.component';

const routes: Routes = [
  { path: '', component: RegistrarDocsDesarrolloComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RegistrarDocsDesarrolloModule {}

