import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PPPService } from '../../../../core/services/ppp.service';

@Component({
  selector: 'app-registrar-constancia-ppp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-constancia-ppp.component.html',
  styleUrl: './registrar-constancia-ppp.component.css'
})
export class RegistrarConstanciaPppComponent {
  idPPP!: number;
  estudiante: any = {};
  documentos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pppService: PPPService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.idPPP = Number(this.route.snapshot.paramMap.get('idPPP'));

    // Obtener documentos cargados
    //this.pppService.getDocumentosByPPP(this.idPPP).subscribe((docs) => {
    //  this.documentos = docs;
    //});
    this.pppService.getEstudianteDetalle(this.idPPP).subscribe((data) => {
      this.estudiante = data;
    });
  }
  volver() {
    this.router.navigate(['/consultar-registrar-constancia']); // Cambia '/ruta-anterior' por la ruta a la que deseas redirigir.
  }

  aceptar() {
    const payload = {
      estadoPPP: 9, // Estado que quieres asignar a PPP
      estadoDetallePPP: 2, // Estado que quieres asignar a Detalle_PPP
      procesoNombre: 'Constancia', // Nombre del proceso para filtrar Detalle_PPP
    };

    this.pppService.aceptarPPP(this.idPPP, payload).subscribe({
      next: (response) => {
        alert('PPP aceptada exitosamente.');
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/consultar-registrar-constancia']); // Redirigir después de aceptar
      },
      error: (error) => {
        console.error('Error al aceptar la PPP:', error);
        alert('Hubo un error al aceptar la PPP.');
      },
    });
  }
}
