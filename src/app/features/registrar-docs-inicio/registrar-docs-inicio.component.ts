import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DetallePPP } from '../../shared/models/detalle-ppp';
import { DetallePPPService } from '../../core/services/detalle-ppp.service';
import { AuthService } from '../../core/services/auth.service';
import { DocService } from '../../core/services/doc.service';
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-docs-inicio.component.html',
  styleUrls: ['./registrar-docs-inicio.component.css']
})
export class RegistrarDocsInicioComponent {
  detallesPPP: DetallePPP[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(
      private detallePPPService: DetallePPPService,
      private docService: DocService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getCurrentUsername();
    if (username) {
      this.authService.getUserIdByUsername(username).subscribe(
          (userId) => this.fetchDetallesPPP(userId),
          (error) => console.error('Error al obtener el ID del usuario:', error)
      );
    }
  }

  fetchDetallesPPP(userId: number): void {
    this.detallePPPService.getDetallesPPP(userId).subscribe(
        (data: DetallePPP[]) => {
          this.detallesPPP = data.filter((detalle) => detalle.proceso.id === 1);
        },
        (error) => console.error('Error al obtener los detalles:', error)
    );
  }

  selectFile(event: any, detalle: DetallePPP): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      this.upload(detalle);
    }
  }

  upload(detalle: DetallePPP): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFile = file;

        this.docService.uploadFile(detalle.id, file, detalle).pipe(
            finalize(() => {
              this.currentFile = undefined;
            })
        ).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = 'Archivo subido exitosamente!';
                // Update `detalle` status or trigger a refresh
                detalle.estado = 1; // Estado pendiente de revisión
              }
            },
            (err: any) => {
              this.progress = 0;
              this.message = 'No se pudo subir el archivo!';
              this.currentFile = undefined;
            }
        );
      }
    }
  }
}
