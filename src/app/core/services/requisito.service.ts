import { Injectable } from '@angular/core';
import { Requisito } from '../models/requisito';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private apiUrl='http://localhost:8080/api/requisitos';
  constructor(private http:HttpClient) { }
  
  getRequisitos():Observable<Requisito[]>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Requisito[]>(this.apiUrl, { headers });
  }

  getRequisitoById(id:number):Observable<Requisito>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Requisito>(`${this.apiUrl}/${id}`, { headers });
  }

  crearRequisito(requisito:Requisito):Observable<Requisito>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<Requisito>(this.apiUrl, requisito, { headers });
  }
  
  deleteRequisito(id:number){
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  updateRequisito(requisito:Requisito, id:number):Observable<Requisito>{
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTczMTk4NzIzOSwiZXhwIjoxNzMxOTkwODM5fQ.dvux3TrFW07knRUxgpQ-eQiKOJlKItQd4b0AnQ8Rs-c'; // Reemplaza con tu token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Requisito>(`${this.apiUrl}/${id}`, requisito, { headers });
  }
}
