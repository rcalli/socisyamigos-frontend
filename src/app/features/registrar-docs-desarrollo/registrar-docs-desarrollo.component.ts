import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DetallePPP } from '../../shared/models/detalle-ppp';
import { DetallePPPService } from '../../core/services/detalle-ppp.service';
import { AuthService } from '../../core/services/auth.service';
import { DocService } from '../../core/services/doc.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Rol } from '../../shared/models/rol';
import { Doc } from '../../shared/models/doc';
import { HeaderComponent } from "../header/header.component";
import { SidebarEstudianteComponent } from "../sidebar/sidebar-estudiante/sidebar-estudiante.component";
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-registrar-docs-desarrollo',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarEstudianteComponent, ChartModule],
  templateUrl: './registrar-docs-desarrollo.component.html',
  styleUrls: ['./registrar-docs-desarrollo.component.css']
})
export class RegistrarDocsDesarrolloComponent implements OnInit {
  detallesPPP: DetallePPP[] = [];
  roles: Rol[] = [];
  currentRole: string = '';
  docsByDetalle: { [key: number]: Doc[] } = {}; // Documentos asociados a cada detallePPP

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  uploading = false;

  stateCounts: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0 }; // Almacena los totales de cada estado
  chartData: any; // Datos del gráfico
  chartOptions: any; // Opciones del gráfico

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
        this.detallesPPP = data.filter((detalle) => detalle.proceso.id === 2);
        this.loadDocsForDetalles();
        this.calculateStateCounts();
        this.updateChart();
      },
      error: (error) => console.error('Error al obtener los detalles:', error)
    });
  }

  private loadDocsForDetalles(): void {
    if (this.detallesPPP.length > 0) {
      this.docService.getAll().subscribe({
        next: (docs: Doc[]) => {
          this.docsByDetalle = {}; // Reinicia el objeto
          docs.forEach((doc) => {
            const detalleId = doc.detalle_ppp.id; // Ajusta según tu modelo
            if (!this.docsByDetalle[detalleId]) {
              this.docsByDetalle[detalleId] = [];
            }
            this.docsByDetalle[detalleId].push(doc);
          });
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

                // Agrega el nuevo documento al detalle correspondiente
                const nuevoDoc = event.body; // Asegúrate de que el backend devuelva el documento subido
                if (!this.docsByDetalle[detalle.id]) {
                  this.docsByDetalle[detalle.id] = [];
                }
                this.docsByDetalle[detalle.id].push(nuevoDoc);

                this.progress = 0;
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
  private calculateStateCounts(): void {
    // Reinicia los contadores
    this.stateCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    this.detallesPPP.forEach((detalle) => {
      if (detalle.estado in this.stateCounts) {
        this.stateCounts[detalle.estado]++;
      }
    });
  }

  private updateChart(): void {
    // Configuración de los datos del gráfico
    this.chartData = {
      labels: ['Falta Subir Archivo', 'Archivo Registrado', 'Archivo Aceptado', 'Archivo Rechazado'],
      datasets: [
        {
          data: [
            this.stateCounts[0],
            this.stateCounts[1],
            this.stateCounts[2],
            this.stateCounts[3]
          ],
          backgroundColor: ['#ffa500', '#36A2EB', '#4CAF50', '#f44336'], // Colores para cada estado
          hoverBackgroundColor: ['#ffa500', '#36A2EB', '#4CAF50', '#f44336']
        }
      ]
    };

    // Opciones del gráfico
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'top'
        }
      },
      responsive: true
    };
  }
}
