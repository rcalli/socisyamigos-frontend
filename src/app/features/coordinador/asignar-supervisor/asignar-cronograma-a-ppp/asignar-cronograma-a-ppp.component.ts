import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PPPEvaluacionService } from '../../../../core/services/ppp-evaluacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarEvaluacionComponent } from '../../../../Modals/agregar-evaluacion/agregar-evaluacion.component';
import { MatDialog } from '@angular/material/dialog';
import { EvaluacionService } from '../../../../core/services/evaluacion.service';

@Component({
  selector: 'app-asignar-cronograma-a-ppp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './asignar-cronograma-a-ppp.component.html',
  styleUrl: './asignar-cronograma-a-ppp.component.css'
})
export class AsignarCronogramaAPppComponent implements OnInit {
  idPPP!: number;
  evaluacion: any[] = [];
  pppEvaluaciones: any[] = [];

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private pppEvaluacionService: PPPEvaluacionService, private evaluacionService: EvaluacionService) {}

  ngOnInit(): void {
    this.idPPP = +this.route.snapshot.paramMap.get('idPPP')!;
    this.cargarPPPEvaluaciones();
    this.cargarEvaluaciones();
  }

  cargarPPPEvaluaciones(): void {
    this.pppEvaluacionService.obtenerEvaluacionesPorPPP(this.idPPP).subscribe((data) => {
      this.pppEvaluaciones = data;
    });
  }

  cargarEvaluaciones(): void {
    this.evaluacionService.getEvaluaciones().subscribe((data) => {
      this.evaluacion = data;
    });
  }

  agregarEvaluacion(idEvaluacion: number): void {
    const payload = { idPPP: this.idPPP, idEvaluacion };
  this.pppEvaluacionService.crearPPPEvaluacion(payload).subscribe({
    next: () => {
      alert('Evaluación agregada al cronograma.');
      this.cargarPPPEvaluaciones();
    },
    error: (err) => {
      console.error(err);
    },
  });
  }
  
  abrirModalAgregar(): void {
    // Abre el modal y pasa las evaluaciones disponibles como datos
  const dialogRef = this.dialog.open(AgregarEvaluacionComponent, {
    width: '400px', // Ajusta el tamaño del modal según sea necesario
    data: { evaluaciones: this.evaluacion }, // Pasa la lista de evaluaciones al modal
  });

  // Suscríbete a la respuesta cuando el modal se cierre
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // Desestructura los datos recibidos del modal
      const { idEvaluacion, fecha } = result;

      // Prepara el payload para enviar al backend
      const payload = { idPPP: this.idPPP, idEvaluacion, fecha };

      // Llama al servicio para crear el registro en la base de datos
      this.pppEvaluacionService.crearPPPEvaluacion(payload).subscribe({
        next: () => {
          this.cargarPPPEvaluaciones(); // Recarga las evaluaciones del cronograma
        },
        error: (err) => {
          console.error('Error al agregar evaluación:', err);
          this.cargarPPPEvaluaciones();
        },
      });
    } else {
      console.log('El modal se cerró sin seleccionar evaluación.');
    }
  });
  }
}
