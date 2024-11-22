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
}