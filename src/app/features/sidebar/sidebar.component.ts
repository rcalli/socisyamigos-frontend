import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf y *ngFor
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule], // Asegúrate de incluir CommonModule
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false; // Variable para manejar el estado del sidebar

  menuItems = [
    { label: 'Plan Académico', icon: 'pi pi-home' },
    { label: 'Mis contratos', icon: 'pi pi-file' },
    { label: 'Mi estado financiero', icon: 'pi pi-shopping-cart' },
    { label: 'Mis solicitudes', icon: 'pi pi-box' },
    { label: 'Bibliotecas electrónicas', icon: 'pi pi-book' },
    { label: 'Mis cursos', icon: 'pi pi-th-large' },
    { label: 'Enviar solicitud', icon: 'pi pi-send' },
    { label: 'Solicitar', icon: 'pi pi-cog' },
    { label: 'Mi calendario', icon: 'pi pi-calendar' },
    { label: 'Lamb Learning', icon: 'pi pi-home' },
    { label: 'Consentimiento Eval. Nut.', icon: 'pi pi-file' },
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
