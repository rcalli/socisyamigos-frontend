import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluacion } from '../models/evaluacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {
  private apiUrl='http://localhost:8080/api/evaluaciones';
  constructor(private http:HttpClient) { }
  
  getEvaluaciones():Observable<Evaluacion[]>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Evaluacion[]>(this.apiUrl, { headers });
  }

  getEvaluacionById(id:number):Observable<Evaluacion>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Evaluacion>(`${this.apiUrl}/${id}`, { headers });
  }

  crearEvaluacion(evaluacion:Evaluacion):Observable<Evaluacion>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Evaluacion>(this.apiUrl, evaluacion, { headers });
  }
  
  deleteEvaluacion(id:number){
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  updateEvaluacion(evaluacion:Evaluacion, id:number):Observable<Evaluacion>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Evaluacion>(`${this.apiUrl}/${id}`, evaluacion, { headers });
  }
}
