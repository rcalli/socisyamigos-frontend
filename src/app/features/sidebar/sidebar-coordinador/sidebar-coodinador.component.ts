import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor
import { SidebarService } from '../../../core/services/sidebar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-coordinador',
  standalone: true,
  imports: [CommonModule, RouterLink], // Asegúrate de incluir CommonModule
  templateUrl: './sidebar-coodinador.component.html',
  styleUrls: ['./sidebar-coodinador.component.css']
})
export class SidebarCoordinadorComponent implements OnInit {
  isCollapsed = false; // Variable para manejar el estado del sidebar

  menuItems = [
    { label: 'Solicitudes de PPP', icon: 'pi pi-home', link: "/consultar-crear-carta" },
    { label: 'Validar documentos de inicio', icon: 'pi pi-file', link: "/validar-coordinador-inicio" },
    { label: 'Asignar Supervisor', icon: 'pi pi-shopping-cart', link: "/consultar-asignar" },
    { label: 'Validar documentos de inicio', icon: 'pi pi-box', link: "/validar-coordinador-desarrollo" },
    { label: 'Registrar Constancia', icon: 'pi pi-box', link: "/consultar-registrar-constancia" },
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
