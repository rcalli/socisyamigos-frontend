import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PPPService } from '../../../../core/services/ppp.service';

@Component({
  selector: 'app-validar-coordinador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validar-docs-inicio.component.html',
  styleUrl: './validar-docs-inicio.component.css'
})
export class ValidarDocsInicioComponent implements OnInit{
  idPPP!: number;
  estudiante: any = {};
  documentos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pppService: PPPService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPPP = Number(this.route.snapshot.paramMap.get('idPPP'));

    // Obtener datos del estudiante
    this.pppService.getEstudianteDetalle(this.idPPP).subscribe((data) => {
      this.estudiante = data;
    });

    // Obtener documentos cargados
    //this.pppService.getDocumentosByPPP(this.idPPP).subscribe((docs) => {
    //  this.documentos = docs;
    //});
    
  }
  volver() {
    this.router.navigate(['/validar-coordinador']); // Cambia '/ruta-anterior' por la ruta a la que deseas redirigir.
  }

  aceptar() {
    this.pppService.aceptarPPP(this.idPPP).subscribe({
      next: (response) => {
        alert('PPP aceptada exitosamente.');
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/validar-coordinador']); // Redirigir después de aceptar
      },
      error: (error) => {
        console.error('Error al aceptar la PPP:', error);
        alert('Hubo un error al aceptar la PPP.');
      }
    });
  }

  rechazar() {
    this.pppService.rechazarPPP(this.idPPP).subscribe({
      next: (response) => {
        alert('PPP rechazada exitosamente.');
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/validar-coordinador']); // Redirigir después de rechazar
      },
      error: (error) => {
        console.error('Error al rechazar la PPP:', error);
        alert('Hubo un error al rechazar la PPP.');
      }
    });
  }
}
