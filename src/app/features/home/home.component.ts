import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetallePPPService } from '../../core/services/detalle-ppp.service';
import { Estudiante } from '../../shared/models/estudiante.model';
import { DetallePPP } from '../../shared/models/detalle-ppp.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  detallesPPP: DetallePPP[] = [];

  constructor(private detallePPPService: DetallePPPService, private authService: AuthService) {}

  ngOnInit(): void {
    const username = this.authService.getCurrentUsername(); // Obtener el username del token
    if (username) {
      // Obtener el ID del usuario por el username
      this.authService.getUserIdByUsername(username).subscribe(
        (userId) => {
          console.log('ID del usuario obtenido:', userId);
          this.fetchDetallesPPP(userId); // Consultar los detalles con el ID obtenido
        },
        (error) => {
          console.error('Error al obtener el ID del usuario:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el username del usuario actual');
      // Aquí puedes redirigir al login si es necesario
    }
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
