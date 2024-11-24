import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class SupervisorService {
  private apiUrl = 'http://localhost:8080/api/supervisores'; // Backend endpoint for Supervisor

  constructor(private http: HttpClient) {}

  // Obtener supervisores por ID de carrera
  getSupervisoresByCarreraId(carreraId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carrera/${carreraId}`);
  }

  // Guardar la asignación del supervisor
  saveSupervisorAssignment(payload: { pppId: number; supervisorId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar-supervisor`, payload, { responseType: 'text' });
  }
}

