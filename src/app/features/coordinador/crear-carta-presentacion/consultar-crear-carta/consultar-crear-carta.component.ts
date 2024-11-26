import { Component } from '@angular/core';
import { PPPService } from '../../../../core/services/ppp.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-crear-carta',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './consultar-crear-carta.component.html',
  styleUrl: './consultar-crear-carta.component.css'
})
export class ConsultarCrearCartaComponent {
  ppps: any[] = [];
  filteredPPPs: any[] = [];
  searchTerm: string = '';

  constructor(private pppService: PPPService, private router: Router) {}

  ngOnInit(): void {
    this.loadPPPs();
  }

  loadPPPs(): void {
    this.pppService.getPPPsByEstado([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).subscribe({
      next: (data) => {
        this.ppps = data;
        this.filteredPPPs = data;
      },
      error: (err) => {
        console.error('Error al cargar las solicitudes de PPP:', err);
        alert('Hubo un problema al cargar las solicitudes.');
      }
    });
  }

  // Filtrar por término de búsqueda
  filterPPPs(): void {
    if (!this.searchTerm) {
      this.filteredPPPs = this.ppps;
    } else {
      this.filteredPPPs = this.ppps.filter((ppp) =>
        ppp.matricula.estudiante.persona.nombre
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
