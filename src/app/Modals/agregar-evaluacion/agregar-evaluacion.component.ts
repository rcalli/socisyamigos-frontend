import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-agregar-evaluacion',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './agregar-evaluacion.component.html',
  styleUrl: './agregar-evaluacion.component.css'
})
export class AgregarEvaluacionComponent {
  evaluaciones: any[] = []; // Lista de evaluaciones
  selectedEvaluacion: number | null = null; // ID de la evaluación seleccionada
  selectedDate: Date | null = null; // Fecha seleccionada

  constructor(
    public dialogRef: MatDialogRef<AgregarEvaluacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { evaluaciones: any[] } // Recibe la lista de evaluaciones como data
  ) {
    this.evaluaciones = data.evaluaciones;
  }

  cerrar(): void {
    this.dialogRef.close(); // Cierra el modal sin enviar datos
  }

  agregar(): void {
    if (this.selectedEvaluacion && this.selectedDate) {
      // Envía los datos seleccionados al componente padre
      this.dialogRef.close({
        idEvaluacion: this.selectedEvaluacion,
        fecha: this.selectedDate,
      });
    } else {
      alert('Por favor, selecciona una evaluación y una fecha.');
    }
  }
}
