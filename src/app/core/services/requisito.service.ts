import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requisito } from '../../shared/models/requisito';

@Injectable({
  providedIn: 'root'
})
export class RequisitoService {
  private apiUrl='http://localhost:8080/api/requisitos';
  constructor(private http:HttpClient) { }
  
  getRequisitos():Observable<Requisito[]>{
    return this.http.get<Requisito[]>(this.apiUrl);
  }

  getRequisitoById(id:number):Observable<Requisito>{
    return this.http.get<Requisito>(`${this.apiUrl}/${id}`);
  }

  crearRequisito(requisito:Requisito):Observable<Requisito>{
    return this.http.post<Requisito>(this.apiUrl, requisito);
  }
  
  deleteRequisito(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateRequisito(requisito:Requisito, id:number):Observable<Requisito>{
    return this.http.put<Requisito>(`${this.apiUrl}/${id}`, requisito);
  }
}
