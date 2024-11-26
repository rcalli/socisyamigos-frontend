import { Component } from '@angular/core';
import { PPPService } from '../../../../../core/services/ppp.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../../header/header.component";
import { SidebarCoordinadorComponent } from "../../../../sidebar/sidebar-coordinador/sidebar-coodinador.component";

@Component({
  selector: 'app-validar-coordinador',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, SidebarCoordinadorComponent],
  templateUrl: './validar-coordinador.component.html',
  styleUrl: './validar-coordinador.component.css'
})
export class ValidarCoordinadorComponent {
  pppList: any[] = []; // Almacena la lista de PPP obtenidas del backend

  constructor(private pppService: PPPService) {}

  ngOnInit(): void {
    this.loadFilteredPPPs('Docs Inicio'); // Llama al método para obtener los datos del API
  }

  loadFilteredPPPs(processName: string): void {
    this.pppService.getFilteredPPPs(processName).subscribe(
      (data) => {
        console.log('Datos obtenidos:', data);
        this.pppList = data; // Asigna los datos obtenidos
      },
      (error) => {
        console.error('Error al obtener los PPP:', error);
      }
    );
  }
}
