import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evaluacion } from '../../shared/models/evaluacion';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private apiUrl = 'http://localhost:8080/api/evaluaciones';

  constructor(private http: HttpClient, private router: Router) {}

  getEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.apiUrl).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('No autorizado: token inválido o expirado.');
          // Opcional: redirigir al login
        }
        return throwError(() => error);
      })
    );
  }

  getEvaluacionById(id: number): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('No autorizado: token inválido o expirado.');
          // Opcional: redirigir al login
        }
        return throwError(() => error);
      })
    );
  }

  crearEvaluacion(evaluacion: Evaluacion): Observable<Evaluacion> {
    return this.http.post<Evaluacion>(this.apiUrl, evaluacion).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('No autorizado: token inválido o expirado.');
          // Opcional: redirigir al login
        }
        return throwError(() => error);
      })
    );
  }

  deleteEvaluacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('No autorizado: token inválido o expirado.');
          // Opcional: redirigir al login
        }
        return throwError(() => error);
      })
    );
  }

  updateEvaluacion(evaluacion: Evaluacion, id: number): Observable<Evaluacion> {
    return this.http.put<Evaluacion>(`${this.apiUrl}/${id}`, evaluacion).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('No autorizado: token inválido o expirado.');
          // Opcional: redirigir al login
        }
        return throwError(() => error);
      })
    );
  }
}

