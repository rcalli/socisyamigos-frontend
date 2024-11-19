import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

// Configuración de la ruta específica para el login
const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,               // Para funcionalidades básicas de Angular (ngIf, ngFor, etc.)
    FormsModule,                // Para trabajar con formularios basados en plantillas
    RouterModule.forChild(routes) // Define las rutas para este módulo
  ]
})
export class LoginModule {}

