import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PPPService } from '../../../../core/services/ppp.service';

@Component({
  selector: 'app-crear-carta',
  standalone: true,
  imports: [],
  templateUrl: './crear-carta.component.html',
  styleUrl: './crear-carta.component.css'
})
export class CrearCartaComponent {
  idPPP!: number;
  ppp: any = {};

  constructor(
    private route: ActivatedRoute,
    private pppService: PPPService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPPP = Number(this.route.snapshot.paramMap.get('idPPP'));
    this.loadPPPData();
  }

  // Cargar los datos de la PPP
  loadPPPData(): void {
    this.pppService.getPppById(this.idPPP).subscribe({
      next: (data) => {
        this.ppp = data;
      },
      error: (err) => {
        console.error('Error al cargar los datos de la PPP:', err);
        alert('No se pudo cargar los datos de la solicitud.');
      },
    });
  }

  // Aceptar la solicitud
  aceptar(): void {
    this.pppService.aceptarCarta(this.idPPP).subscribe({
      next: (response) => {
        // Asegúrate de acceder al mensaje dentro del objeto de respuesta
        if (response && response.message) {
          alert(response.message); // Muestra el mensaje del backend
        } else {
          alert('Solicitud aceptada correctamente.');
        }
        this.router.navigate(['/consultar-crear-carta']);
      },
      error: (err) => {
        console.error('Error al aceptar la solicitud:', err);
        alert(err.error?.error || 'Hubo un error al aceptar la solicitud.');
      },
    });
  }

  // Rechazar la solicitud
  rechazar(): void {
    if (this.ppp.estado !== 0) {
      alert('No se puede rechazar una solicitud que ya ha sido aceptada o rechazada.');
      return;
    }
    this.pppService.rechazarCarta(this.idPPP).subscribe({
      next: () => {
        alert('Solicitud rechazada correctamente.');
        this.router.navigate(['/consultar-crear-carta']);
      },
      error: (err) => {
        console.error('Error al rechazar la solicitud:', err);
        alert(err.error || 'Hubo un error al rechazar la solicitud.');
      },
    });
  }

  // Volver atrás
  volver(): void {
    this.router.navigate(['/consultar-crear-carta']);
  }
}
