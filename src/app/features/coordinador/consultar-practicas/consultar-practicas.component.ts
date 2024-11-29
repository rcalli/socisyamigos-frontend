import { Component } from '@angular/core';
import {LineaCarrera} from '../../../shared/models/linea-carrera';
import {Carrera} from '../../../shared/models/carrera';
import {LineaCarreraService} from '../../../core/services/linea-carrera.service';
import {CarreraService} from '../../../core/services/carrera.service';

@Component({
  selector: 'app-consultar-practicas',
  standalone: true,
  imports: [],
  templateUrl: './consultar-practicas.component.html',
  styleUrl: './consultar-practicas.component.css'
})
export class ConsultarPracticasComponent {
  lineaCarreras: LineaCarrera[] = [];
  carreras: Carrera[] = [];
  selectedLineaCarrera: LineaCarrera | null = null;

  constructor(
    private lineaCarreraService: LineaCarreraService,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.getLineaCarreras();
    this.getCarreras();
  }

  getLineaCarreras(): void {
    this.lineaCarreraService.getAll().subscribe((data) => {
      this.lineaCarreras = data;
    });
  }

  getCarreras(): void {
    this.carreraService.getAll().subscribe((data) => {
      this.carreras = data;
    });
  }

  selectLineaCarrera(lineaCarrera: LineaCarrera): void {
    this.selectedLineaCarrera = { ...lineaCarrera };
  }

  saveLineaCarrera(): void {
    if (this.selectedLineaCarrera) {
      if (this.selectedLineaCarrera.id) {
        this.lineaCarreraService
          .update(this.selectedLineaCarrera.id, this.selectedLineaCarrera)
          .subscribe(() => this.getLineaCarreras());
      } else {
        this.lineaCarreraService
          .create(this.selectedLineaCarrera)
          .subscribe(() => this.getLineaCarreras());
      }
      this.selectedLineaCarrera = null;
    }
  }

  deleteLineaCarrera(id: number): void {
    this.lineaCarreraService.delete(id).subscribe(() => this.getLineaCarreras());
  }

  newLineaCarrera(): void {
    this.selectedLineaCarrera = new LineaCarrera();
  }
}
