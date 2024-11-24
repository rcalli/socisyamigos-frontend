import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PPPService } from '../../../../core/services/ppp.service';
import { SupervisorService } from '../../../../core/services/supervisor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignar-supervisor-a-ppp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './asignar-supervisor-a-ppp.component.html',
  styleUrl: './asignar-supervisor-a-ppp.component.css'
})
export class AsignarSupervisorAPppComponent implements OnInit{
  pppId!: number;
  pppData: any = null;
  supervisores: any[] = [];
  selectedSupervisorId!: number;
  errorMessage: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private pppService: PPPService, private supervisorService: SupervisorService, private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener el ID de la URL
    this.pppId = +this.route.snapshot.paramMap.get('idPPP')!;
    this.loadPPPData();
  }

  // Método para cargar los datos del PPP
  loadPPPData(): void {
    this.pppService.getPppById(this.pppId).subscribe({
      next: (data) => {
        this.pppData = data;
        this.loadSupervisores(data.matricula.plan_carrera.carrera.id); // Usa el ID de la carrera para cargar supervisores
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos del PPP.';
        console.error(err);
      },
    });
  }

  // Cargar supervisores por ID de carrera
  loadSupervisores(idCarrera: number): void {
    this.supervisorService.getSupervisoresByCarreraId(idCarrera).subscribe({
      next: (data) => {
        this.supervisores = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los supervisores.';
        console.error(err);
      },
    });
  }

  // Guardar asignación del supervisor
  guardarAsignacion(): void {
    if (!this.selectedSupervisorId) {
      alert('Por favor, selecciona un supervisor.');
      return;
    }

    const payload = {
      pppId: this.pppId,
      supervisorId: this.selectedSupervisorId,
    };
    console.log('Payload enviado:', payload);

    this.supervisorService.saveSupervisorAssignment(payload).subscribe({
      next: () => {
        alert("Supervisor asignado correctamente.");
        this.router.navigate(['/consultar-asignar']); // Redirige al listado de PPPs u otra página
      },
      error: (err) => {
        alert('Error al asignar el supervisor.');
        console.error(err);
      },
    });
  }
}
