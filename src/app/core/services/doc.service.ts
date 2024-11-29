import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doc } from '../../shared/models/doc';
import {DetallePPP} from '../../shared/models/detalle-ppp';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private apiUrl = 'http://localhost:8080/api/docs';

  constructor(private http: HttpClient) {}

  // Métodos existentes
  getDocs(userId: number): Observable<Doc[]> {
    return this.http.get<Doc[]>(`${this.apiUrl}/${userId}`);
  }

  getAll(): Observable<Doc[]> {
    return this.http.get<Doc[]>(this.apiUrl);
  }

  getById(id: number): Observable<Doc> {
    return this.http.get<Doc>(`${this.apiUrl}/${id}`);
  }

  create(doc: Doc): Observable<Doc> {
    return this.http.post<Doc>(this.apiUrl, doc);
  }

  update(id: number, doc: Doc): Observable<Doc> {
    return this.http.put<Doc>(`${this.apiUrl}/${id}`, doc);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Nuevos métodos para manejo de archivos
  upload(file: File, detalleId: number, detallePPP: DetallePPP): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('detallePPP', JSON.stringify(detallePPP));

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const req = new HttpRequest('POST', `${this.apiUrl}/upload/${detalleId}`, formData, {
      headers: headers,
      reportProgress: true
    });

    return this.http.request(req);
  }

  downloadFile(fileName: string): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/download/${fileName}`, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
