import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PPPEvaluacionService {
  private apiUrl = 'http://localhost:8080/api/ppp_evaluaciones';// Cambia según tu configuración
  constructor(private http: HttpClient) {}

  // Crear un nuevo registro
  crearPPPEvaluacion(payload: { idPPP: number; idEvaluacion: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar-cronograma`, payload).pipe(
        catchError((error) => {
          alert(error.error || 'Error al generar el cronograma.');
          return throwError(() => error);
        })
      );;
  }

  // Obtener evaluaciones de un PPP
  obtenerEvaluacionesPorPPP(idPPP: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ppp/${idPPP}`);
  }
}