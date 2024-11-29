import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PPPEvaluacionService } from '../../../core/services/ppp-evaluacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarSupervisorComponent } from "../../sidebar/sidebar-supervisor/sidebar-supervisor.component";
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-registrar-evaluaciones',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarSupervisorComponent, HeaderComponent],
  templateUrl: './registrar-evaluaciones.component.html',
  styleUrl: './registrar-evaluaciones.component.css'
})
export class RegistrarEvaluacionesComponent {
  idPPP!: number; // ID del PPP seleccionado
  pppEvaluaciones: any[] = []; // Evaluaciones asociadas al PPP
  selectedEvaluacion: any = null; // Evaluación seleccionada
  nota: number | null = null; // Nota ingresada por el usuario

  constructor(
    private route: ActivatedRoute,
    private pppEvaluacionService: PPPEvaluacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del PPP desde la URL
    this.idPPP = Number(this.route.snapshot.paramMap.get('idPPP'));
    this.loadEvaluaciones();
  }

  // Cargar las evaluaciones asociadas al PPP
  loadEvaluaciones(): void {
    this.pppEvaluacionService.obtenerEvaluacionesPorPPP(this.idPPP).subscribe({
      next: (data) => {
        this.pppEvaluaciones = data;
        if (data.length > 0) {
          this.selectedEvaluacion = data[0].id; // Seleccionar la primera evaluación por defecto
        }
      },
      error: (err) => {
        console.error('Error al cargar las evaluaciones:', err);
      },
    });
  }

  // Registrar nota en una evaluación
  guardarNota(): void {
    if (!this.selectedEvaluacion || this.nota === null) {
      alert('Debe seleccionar una evaluación y registrar una nota.');
      return;
    }

    this.pppEvaluacionService.registrarNota(this.selectedEvaluacion, this.nota).subscribe({
      next: () => {
        alert('Nota registrada exitosamente.');
        this.loadEvaluaciones(); // Recargar las evaluaciones después de guardar
      },
      error: (err) => {
        console.error('Error al registrar la nota:', err);
        alert('Hubo un error al registrar la nota.');
      },
    });
  }

  // Volver a la página anterior
  volver(): void {
    this.router.navigate(['/consultar-registrar-evaluaciones']); // Ajusta la ruta según tu flujo
  }
}
