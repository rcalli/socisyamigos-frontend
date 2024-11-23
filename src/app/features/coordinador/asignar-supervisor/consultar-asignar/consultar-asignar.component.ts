import { Component, OnInit } from '@angular/core';
import { PPPService } from '../../../../core/services/ppp.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-asignar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consultar-asignar.component.html',
  styleUrl: './consultar-asignar.component.css'
})
export class ConsultarAsignarComponent implements OnInit{
  pppList: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private pppService: PPPService) {}

  ngOnInit(): void {
    this.fetchPPPsByEstado(3); // Obtiene los PPP con estado 3 (completado)
  }

  fetchPPPsByEstado(estado: number): void {
    this.loading = true;
    this.pppService.getPPPsByEstado().subscribe(
      (data) => {
        this.pppList = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener PPPs:', error);
        this.error = 'Hubo un error al cargar los datos. Intenta de nuevo más tarde.';
        this.loading = false;
      }
    );
  }
}
