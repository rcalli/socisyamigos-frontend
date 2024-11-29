import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private apiUrl = 'http://localhost:8080/api/matriculas';
  
  constructor(private http: HttpClient) {}

  getMatriculaByUsuarioId(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${idUsuario}`);
  }
}