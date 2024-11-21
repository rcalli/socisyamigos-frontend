import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePPP } from '../../shared/models/detalle-ppp.model';

@Injectable({
  providedIn: 'root'
})
export class DetallePPPService {
  private apiUrl = 'http://localhost:8080/api/detalle_ppps/ppp/usuario'; // Cambia esta URL según la configuración de tu backend

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los detalles de PPP de un usuario por su ID
   * @param userId ID del usuario
   * @returns Observable con los detalles de PPP
   */
  getDetallesPPP(userId: number): Observable<DetallePPP[]> {
    return this.http.get<DetallePPP[]>(`${this.apiUrl}/${userId}`);
    }
    
}
