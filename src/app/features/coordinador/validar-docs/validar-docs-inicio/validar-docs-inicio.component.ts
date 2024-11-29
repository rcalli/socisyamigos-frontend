import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PPPService } from '../../../../core/services/ppp.service';
import { SidebarCoordinadorComponent } from "../../../sidebar/sidebar-coordinador/sidebar-coodinador.component";
import { HeaderComponent } from "../../../header/header.component";

@Component({
  selector: 'app-validar-coordinador',
  standalone: true,
  imports: [CommonModule, SidebarCoordinadorComponent, HeaderComponent],
  templateUrl: './validar-docs-inicio.component.html',
  styleUrl: './validar-docs-inicio.component.css'
})
export class ValidarDocsInicioComponent implements OnInit{
  idPPP!: number;
  ppp: any = {};
  documentos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pppService: PPPService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPPP = Number(this.route.snapshot.paramMap.get('idPPP'));

    // Obtener datos del estudiante
    this.pppService.getPppById(this.idPPP).subscribe((data) => {
      this.ppp = data;
    });

    // Obtener documentos cargados
    //this.pppService.getDocumentosByPPP(this.idPPP).subscribe((docs) => {
    //  this.documentos = docs;
    //});
    
  }
  volver() {
    this.router.navigate(['/validar-coordinador-inicio']); // Cambia '/ruta-anterior' por la ruta a la que deseas redirigir.
  }

  aceptar() {
    const payload = {
      estadoPPP: 3, // Estado que quieres asignar a PPP
      estadoDetallePPP: 2, // Estado que quieres asignar a Detalle_PPP
      procesoNombre: 'Docs Inicio', // Nombre del proceso para filtrar Detalle_PPP
    };

    this.pppService.aceptarPPP(this.idPPP, payload).subscribe({
      next: (response) => {
        alert('PPP aceptada exitosamente.');
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/validar-coordinador-inicio']); // Redirigir después de aceptar
      },
      error: (error) => {
        console.error('Error al aceptar la PPP:', error);
        alert('Hubo un error al aceptar la PPP.');
      },
    });
  }

  rechazar() {
    const payload = {
      estadoPPP: 4, // Estado que deseas asignar a la PPP cuando es rechazada
      estadoDetallePPP: 3, // Estado que quieres asignar a Detalle_PPP
      procesoNombre: 'Docs Inicio', // Nombre del proceso para filtrar Detalle_PPP
    };

    this.pppService.rechazarPPP(this.idPPP, payload).subscribe({
      next: (response) => {
        alert('PPP rechazada exitosamente.');
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/validar-coordinador-inicio']); // Redirigir después de rechazar
      },
      error: (error) => {
        console.error('Error al rechazar la PPP:', error);
        alert('Hubo un error al rechazar la PPP.');
      },
    });
  }
}
