import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePPP } from '../../shared/models/detalle-ppp';


@Injectable({
  providedIn: 'root'
})
export class DetallePPPService {
  private apiUrl = 'http://localhost:8080/api/detalle_ppps'; // Cambia esta URL según la configuración de tu backend

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los detalles de PPP de un usuario por su ID
   * @param userId ID del usuario
   * @returns Observable con los detalles de PPP
   */
  getDetallesPPP(userId: number): Observable<DetallePPP[]> {
    return this.http.get<DetallePPP[]>(`${this.apiUrl}/ppp/usuario/${userId}`);
    }
  getAll(): Observable<DetallePPP[]> {
    return this.http.get<DetallePPP[]>(this.apiUrl);
  }

  getById(id: number): Observable<DetallePPP> {
    return this.http.get<DetallePPP>(`${this.apiUrl}/${id}`);
  }

  create(detalleppp: DetallePPP): Observable<DetallePPP> {
    return this.http.post<DetallePPP>(this.apiUrl, detalleppp);
  }

  update(id: number, detalleppp: DetallePPP): Observable<DetallePPP> {
    return this.http.put<DetallePPP>(`${this.apiUrl}/${id}`, detalleppp);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
