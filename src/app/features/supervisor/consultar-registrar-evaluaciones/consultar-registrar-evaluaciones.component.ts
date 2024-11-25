import { Component, OnInit } from '@angular/core';
import { PPPEvaluacionService } from '../../../core/services/ppp-evaluacion.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-registrar-evaluaciones',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './consultar-registrar-evaluaciones.component.html',
  styleUrl: './consultar-registrar-evaluaciones.component.css'
})
export class ConsultarRegistrarEvaluacionesComponent implements OnInit {
  pppData: any[] = []; // Lista de PPP obtenidos
  isLoading = false; // Estado de carga

  constructor(
    private pppEvaluacionService: PPPEvaluacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPPPData();
  }

  // Cargar datos de PPP basados en PPP_Evaluacion
  loadPPPData(): void {
    this.isLoading = true;

    // Obtener el idUsuario desde AuthService
    const username = this.authService.getCurrentUsername();
    if (username) {
      this.authService.getUserIdByUsername(username).subscribe({
        next: (userId) => {
          this.pppEvaluacionService.getPPPEvaluacionesByUsuario(userId).subscribe({
            next: (data) => {
              // Extraer datos únicos de PPP de los registros de PPP_Evaluacion
              this.pppData = this.extractUniquePPP(data);
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error al cargar las evaluaciones:', err);
              this.isLoading = false;
            },
          });
        },
        error: (err) => {
          console.error('Error al obtener ID del usuario:', err);
          this.isLoading = false;
        },
      });
    } else {
      console.error('No se pudo obtener el nombre de usuario actual.');
      this.isLoading = false;
    }
  }

  // Extraer datos únicos de PPP
  extractUniquePPP(evaluaciones: any[]): any[] {
    const uniquePPPs = new Map();
    for (const evaluacion of evaluaciones) {
      const ppp = evaluacion.ppp;
      if (!uniquePPPs.has(ppp.id)) {
        uniquePPPs.set(ppp.id, ppp);
      }
    }
    return Array.from(uniquePPPs.values());
  }
}
