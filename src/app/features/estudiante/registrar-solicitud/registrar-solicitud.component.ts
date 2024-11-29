import { Component, OnInit } from '@angular/core';
import { PPPService } from '../../../core/services/ppp.service';
import { LineaCarreraService } from '../../../core/services/linea-carrera.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../../core/services/empresa.service';
import { MatriculaService } from '../../../core/services/matricula.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { SidebarEstudianteComponent } from "../../sidebar/sidebar-estudiante/sidebar-estudiante.component";

@Component({
  selector: 'app-registrar-solicitud',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, SidebarEstudianteComponent],
  templateUrl: './registrar-solicitud.component.html',
  styleUrl: './registrar-solicitud.component.css'
})
export class RegistrarSolicitudComponent implements OnInit {
  matricula: any = {}; // Inicializado como objeto vacío para evitar errores de referencia
  lineasCarrera: any[] = []; // Líneas de carrera asociadas a la matrícula
  empresas: any[] = []; // Lista de empresas disponibles
  selectedLineaCarrera: number | null = null; // Línea de carrera seleccionada
  selectedEmpresa: number | null = null; // Empresa seleccionada
  isLoading: boolean = false; // Indicador de carga para mejorar UX

  constructor(
    private pppService: PPPService,
    private empresaService: EmpresaService,
    private lineaCarreraService: LineaCarreraService,
    private matriculaService: MatriculaService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadEmpresas();
  }

  // Cargar datos del usuario actual
  loadUserData(): void {
    const username = this.authService.getCurrentUsername();
    if (username) {
      this.authService.getUserIdByUsername(username).subscribe({
        next: (userId) => {
          console.log('Id usuario:', userId);
          this.loadMatricula(userId);
        },
        error: (err) => {
          console.error('Error al obtener el ID del usuario:', err);
          alert('No se pudo cargar los datos del usuario.');
        },
      });
    } else {
      console.error('No se pudo obtener el nombre de usuario actual.');
      alert('No se pudo cargar el nombre de usuario.');
    }
  }

  // Cargar la matrícula del usuario
  loadMatricula(userId: number): void {
    this.isLoading = true; // Activar el indicador de carga
    this.matriculaService.getMatriculaByUsuarioId(userId).subscribe({
      next: (data) => {
        // Guardar la matrícula en una variable local
        this.matricula = data[0]; // Si el backend devuelve un array, extrae el primer elemento
        console.log('Matrícula cargada:', this.matricula);
        this.isLoading = false;
        // Usar el ID de la matrícula desde la variable
        if (this.matricula && this.matricula.id) {
          this.loadLineasCarrera(this.matricula.id);
          this.isLoading = false;
        } else {
          console.error('El ID de la matrícula no está definido.');
          alert('No se pudo cargar la matrícula correctamente.');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar la matrícula:', err);
        this.isLoading = false;
      },
    });
  }

  // Cargar las líneas de carrera asociadas a la matrícula
  loadLineasCarrera(idMatricula: number): void {
    this.lineaCarreraService.getLineasCarreraByMatriculaId(idMatricula).subscribe({
      next: (data) => {
        this.lineasCarrera = data;
      },
      error: (err) => {
        console.error('Error al cargar las líneas de carrera:', err);
        alert('Hubo un problema al cargar las líneas de carrera.');
      },
    });
  }

  // Cargar la lista de empresas
  loadEmpresas(): void {
    this.empresaService.getEmpresas().subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (err) => {
        console.error('Error al cargar las empresas:', err);
        alert('Hubo un problema al cargar las empresas.');
      },
    });
  }
  volverAtras(): void {
    this.router.navigate(['/consultar-estudiante']); // Cambia '/dashboard' por la ruta a la que deseas volver
  }

  // Crear el registro en PPP
  createPPP(): void {
    if (!this.selectedEmpresa || !this.matricula) {
      alert('Debes seleccionar una empresa y asegurarte de que los datos de matrícula estén cargados.');
      return;
    }
  
    const payload = {
      idMatricula: this.matricula.id,
      idLineaCarrera: this.selectedLineaCarrera,
      idEmpresa: this.selectedEmpresa,
    };
  
    this.pppService.createPPP(payload).subscribe({
      next: (response: any) => {
        if (response.message) {
          alert(response.message); // Mostrar mensaje de éxito
        }
        this.router.navigate(['/consultar-estudiante']); // Cambiar la ruta según el flujo
      },
      error: (err) => {
        console.error('Error al crear la solicitud:', err);
        if (err.error && err.error.error) {
          alert(err.error.error); // Mostrar mensaje de error del backend
        } else {
          alert('Hubo un error al crear la solicitud.');
        }
      },
    });
  }
}
