import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PPPService {
  private apiUrl = 'http://localhost:8080/api/ppps'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  getFilteredPPPs(processName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/filtered/${processName}`);
  }

  getPppById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  getEstudianteDetalle(idPPP: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalle/${idPPP}`);
  }

  //getDocumentosByPPP(idPPP: number): Observable<any[]> {
    //return this.http.get<any[]>(`${this.apiUrl}/documentos/ppp/${idPPP}`);
  //}

  // Método para aceptar PPP con estados dinámicos
  aceptarPPP(idPPP: number, payload: { estadoPPP: number; estadoDetallePPP: number; procesoNombre: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idPPP}/aceptar`, payload);
  }

  // Método para rechazar PPP (puedes implementarlo si es necesario)
  rechazarPPP(idPPP: number, payload: { estadoPPP: number; estadoDetallePPP: number; procesoNombre: string  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${idPPP}/rechazar`, payload);
  }

  getPPPsByEstado(estados: number[]): Observable<any> {
    const estadosParam = estados.join(','); // Convierte la lista de números en una cadena separada por comas
    return this.http.get<any>(`${this.apiUrl}/estado?estados=${estadosParam}`);
  }
  createPPP(payload: { idMatricula: number; idLineaCarrera: number | null; idEmpresa: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-ppp`, payload);
  }
}
