import { Component, OnInit } from '@angular/core';
import { PPPService } from '../../../../core/services/ppp.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarCoordinadorComponent } from "../../../sidebar/sidebar-coordinador/sidebar-coodinador.component";
import { HeaderComponent } from "../../../header/header.component";

@Component({
  selector: 'app-consultar-asignar',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarCoordinadorComponent, HeaderComponent],
  templateUrl: './consultar-asignar.component.html',
  styleUrl: './consultar-asignar.component.css'
})
export class ConsultarAsignarComponent implements OnInit{
  pppList: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private pppService: PPPService) {}

  ngOnInit(): void {
    this.fetchPPPsByEstado(); // Obtiene los PPP con estado 3 (completado)
  }

  fetchPPPsByEstado(): void {
    this.loading = true;
    this.pppService.getPPPsByEstado([3, 5, 6]).subscribe(
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
