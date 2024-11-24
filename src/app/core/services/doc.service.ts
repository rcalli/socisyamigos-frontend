import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doc } from '../../shared/models/doc';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private apiUrl = 'http://localhost:8080/api/docs';

  constructor(private http: HttpClient) {}

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

  uploadFile(detalleId: number, file: File, detallePPP: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('detallePPP', JSON.stringify(detallePPP));

    return this.http.post(`${this.apiUrl}/upload/${detalleId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
