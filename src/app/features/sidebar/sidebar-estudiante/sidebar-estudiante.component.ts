import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor
import { SidebarService } from '../../../core/services/sidebar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-estudiante',
  standalone: true,
  imports: [CommonModule, RouterLink], // Asegúrate de incluir CommonModule
  templateUrl: './sidebar-estudiante.component.html',
  styleUrls: ['./sidebar-estudiante.component.css']
})
export class SidebarEstudianteComponent implements OnInit {
  isCollapsed = false; // Variable para manejar el estado del sidebar

  menuItems = [
    { label: 'Consultar PPP', icon: 'pi pi-home', link: "/consultar-estudiante" },
    { label: 'Registrar Solicitud', icon: 'pi pi-file', link: "/registrar-solicitud-ppp" },
    { label: 'Registrar Documentos de Inicio', icon: 'pi pi-shopping-cart', link: "/doc-inicio" },
    { label: 'Registrar Documentos de Desarrollo', icon: 'pi pi-box', link: "" },
    { label: 'Cerrar Sesion', icon: 'pi pi-box', link: "/login" },
  ];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    // Asegúrate de que este observable esté funcionando
    this.sidebarService.isCollapsed$.subscribe(
      (state) => {
        console.log('Sidebar state changed:', state); // Debugging
        this.isCollapsed = state;
      }
    );
  }
}
