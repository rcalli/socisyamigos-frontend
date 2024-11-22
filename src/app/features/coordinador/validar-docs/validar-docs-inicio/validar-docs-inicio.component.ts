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
    this.pppService.getDocumentosByPPP(this.idPPP).subscribe((docs) => {
      this.documentos = docs;
    });
    
  }
  volver() {
    this.router.navigate(['/validar-coordinador']); // Cambia '/ruta-anterior' por la ruta a la que deseas redirigir.
  }

  // Función para el botón "Aceptar"
  aceptar() {
    // Lógica para aceptar (por ejemplo, enviar datos al backend).
    console.log('Acción de aceptar ejecutada.');
    alert('¡Solicitud aceptada!');
  }

  // Función para el botón "Rechazar"
  rechazar() {
    // Lógica para rechazar (por ejemplo, enviar datos al backend).
    console.log('Acción de rechazar ejecutada.');
    alert('Solicitud rechazada.');
  }
}
