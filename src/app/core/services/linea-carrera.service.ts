import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LineaCarrera} from '../../shared/models/linea-carrera';


@Injectable({
  providedIn: 'root',
})
export class LineaCarreraService {
  private apiUrl = 'http://localhost:8080/api/linea_carreras'; // Backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<LineaCarrera[]> {
    return this.http.get<LineaCarrera[]>(this.apiUrl);
  }

  getById(id: number): Observable<LineaCarrera> {
    return this.http.get<LineaCarrera>(`${this.apiUrl}/${id}`);
  }

  create(lineaCarrera: LineaCarrera): Observable<LineaCarrera> {
    return this.http.post<LineaCarrera>(this.apiUrl, lineaCarrera);
  }

  update(id: number, lineaCarrera: LineaCarrera): Observable<LineaCarrera> {
    return this.http.put<LineaCarrera>(`${this.apiUrl}/${id}`, lineaCarrera);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getLineasCarreraByMatriculaId(idMatricula: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matricula/${idMatricula}`);
  }
}
