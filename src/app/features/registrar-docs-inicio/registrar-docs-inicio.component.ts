import { CommonModule } from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DetallePPP } from '../../shared/models/detalle-ppp';
import { DetallePPPService } from '../../core/services/detalle-ppp.service';
import { AuthService } from '../../core/services/auth.service';
import { DocService } from '../../core/services/doc.service';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Rol} from '../../shared/models/rol';
import {Doc} from '../../shared/models/doc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-docs-inicio.component.html',
  styleUrls: ['./registrar-docs-inicio.component.css']
})
export class RegistrarDocsInicioComponent implements OnInit {
  detallesPPP: DetallePPP[] = [];
  roles: Rol[] = [];
  currentRole: string = '';
  docs: Doc[] = [];

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  uploading = false;

  constructor(
    private detallePPPService: DetallePPPService,
    private authService: AuthService,
    private docService: DocService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const username = this.authService.getCurrentUsername();
    if (username) {
      this.loadRoles(username);
      this.loadUserDetails(username);
    } else {
      console.error('No se pudo obtener el username del usuario actual');
    }
  }

  private loadRoles(username: string): void {
    this.authService.getRolesByUsername(username).subscribe({
      next: (roles: Rol[]) => {
        this.roles = roles;
        if (roles.length > 0) {
          this.currentRole = roles[0].nombre.replace('ROLE_', '');
        }
      },
      error: (error) => console.error('Error al obtener los roles:', error)
    });
  }

  private loadUserDetails(username: string): void {
    this.authService.getUserIdByUsername(username).subscribe({
      next: (userId) => this.fetchDetallesPPP(userId),
      error: (error) => console.error('Error al obtener el ID del usuario:', error)
    });
  }

  fetchDetallesPPP(userId: number): void {
    this.detallePPPService.getDetallesPPP(userId).subscribe({
      next: (data: DetallePPP[]) => {
        this.detallesPPP = data.filter((detalle) => detalle.proceso.id === 1);
        this.loadDocsForDetalles();
      },
      error: (error) => console.error('Error al obtener los detalles:', error)
    });
  }

  private loadDocsForDetalles(): void {
    if (this.detallesPPP.length > 0) {
      this.docService.getAll().subscribe({
        next: (docs: Doc[]) => {
          this.docs = docs;
          // Aquí puedes relacionar los docs con sus detallesPPP correspondientes
        },
        error: (error) => console.error('Error al cargar documentos:', error)
      });
    }
  }

  selectFile(event: any, detalle: DetallePPP): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      this.upload(detalle);
    }
  }

  upload(detalle: DetallePPP): void {
    if (this.selectedFiles && !this.uploading) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.uploading = true;
        this.currentFile = file;
        this.progress = 0;
        this.message = '';

        this.docService.upload(file, detalle.id, detalle)
          .pipe(finalize(() => {
            this.currentFile = undefined;
            this.uploading = false;
          }))
          .subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = 'Archivo subido exitosamente!';
                detalle.estado = 1;
                this.loadDocsForDetalles(); // Recargar los documentos
              }
            },
            error: (err) => {
              this.progress = 0;
              this.message = err.status === 401
                ? 'Sesión expirada. Por favor, inicie sesión nuevamente.'
                : 'Error al subir el archivo: ' + (err.error?.message || 'Error desconocido');
            }
          });
      }
    }
  }

  downloadDoc(fileName: string): void {
    this.docService.downloadFile(fileName).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => console.error('Error al descargar el archivo:', error)
    });
  }
}
