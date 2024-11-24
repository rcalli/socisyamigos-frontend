import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DetallePPPService } from '../../../core/services/detalle-ppp.service';
import { DetallePPP } from '../../../shared/models/detalle-ppp';
import { AuthService } from '../../../core/services/auth.service';
import { Rol } from '../../../shared/models/rol';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-estudiante.component.html',
  styleUrl: './consultar-estudiante.component.css'
})
export class ConsultarEstudianteComponent {
  detallesPPP: DetallePPP[] = [];
  roles: Rol[] = [];
  currentRole: string = ''; // Variable para almacenar el rol principal (opcional)
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
      },
      (error) => {
        console.error('Error al obtener los detalles:', error);
      }
    );
  }
}
