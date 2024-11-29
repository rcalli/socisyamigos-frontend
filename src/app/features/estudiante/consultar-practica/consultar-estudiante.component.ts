import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DetallePPPService } from '../../../core/services/detalle-ppp.service';
import { DetallePPP } from '../../../shared/models/detalle-ppp';
import { AuthService } from '../../../core/services/auth.service';
import { Rol } from '../../../shared/models/rol';
import { HeaderComponent } from "../../header/header.component";
import { SidebarEstudianteComponent } from "../../sidebar/sidebar-estudiante/sidebar-estudiante.component";
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarEstudianteComponent, ChartModule],
  templateUrl: './consultar-estudiante.component.html',
  styleUrl: './consultar-estudiante.component.css'
})
export class ConsultarEstudianteComponent {
  detallesPPP: DetallePPP[] = [];
  roles: Rol[] = [];
  currentRole: string = ''; // Variable para almacenar el rol principal (opcional)
  completedCount: number = 0; // Cantidad de registros con estado 2
  totalCount: number = 0; // Total de registros
  completionPercentage: number = 0; // Porcentaje calculado
  chartData: any; // Configuración de datos del gráfico
  chartOptions: any; // Opciones del gráfico
  constructor(private detallePPPService: DetallePPPService, private authService: AuthService) {}

  ngOnInit(): void {
    const username = this.authService.getCurrentUsername();
    if (username) {
      // Obtener roles y cargar los detalles
      this.authService.getRolesByUsername(username).subscribe(
        (roles: Rol[]) => {
          console.log('Roles obtenidos:', roles);
          this.roles = roles;

          // Si deseas mostrar un rol específico, elimina el prefijo ROLE_
        if (roles.length > 0) {
          this.currentRole = roles[0].nombre.replace('ROLE_', ''); // Elimina "ROLE_"
        }
        },
        (error) => {
          console.error('Error al obtener los roles:', error);
        }
      );

      // Obtener los detalles PPP
      this.authService.getUserIdByUsername(username).subscribe(
        (userId) => {
          console.log('ID del usuario obtenido:', userId);
          this.fetchDetallesPPP(userId);
        },
        (error) => {
          console.error('Error al obtener el ID del usuario:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el username del usuario actual');
      // Redirigir al login si es necesario
    }
  }

  // Método de ejemplo para el evento click
  onComplete(detalle: DetallePPP): void {
    console.log('Botón clickeado para el requisito:', detalle.requisito?.nombre);
    // Aquí puedes implementar la lógica para marcar como completado o realizar otra acción
  }

  fetchDetallesPPP(userId: number): void {
    this.detallePPPService.getDetallesPPP(userId).subscribe(
      (data: DetallePPP[]) => {
        console.log('Datos obtenidos:', data);
        this.detallesPPP = data;
        this.totalCount = data.length;
        this.completedCount = data.filter(d => d.estado === 2).length;
        this.completionPercentage = Math.round((this.completedCount / this.totalCount) * 100);
        this.updateChart();
      },
      (error) => {
        console.error('Error al obtener los detalles:', error);
      }
    );
  }
  updateChart(): void {
    this.chartData = {
      labels: ['Completado', 'Pendiente'],
      datasets: [
        {
          data: [this.completionPercentage, 100 - this.completionPercentage],
          backgroundColor: ['#4CAF50', '#E0E0E0'], // Verde y gris
          hoverBackgroundColor: ['#45A049', '#D6D6D6']
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        }
      },
      cutout: '70%' // Para hacer el gráfico tipo "doughnut"
    };
  }
}
