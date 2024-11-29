import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor
import { SidebarService } from '../../../core/services/sidebar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-supervisor',
  standalone: true,
  imports: [CommonModule, RouterLink], // Asegúrate de incluir CommonModule
  templateUrl: './sidebar-supervisor.component.html',
  styleUrls: ['./sidebar-supervisor.component.css']
})
export class SidebarSupervisorComponent implements OnInit {
  isCollapsed = false; // Variable para manejar el estado del sidebar

  menuItems = [
    { label: 'Registrar Evaluacion', icon: 'pi pi-home', link: "/consultar-registrar-evaluaciones" },
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
