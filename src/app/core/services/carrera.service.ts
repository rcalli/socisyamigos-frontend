import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Carrera} from '../../shared/models/carrera';


@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private apiUrl = 'http://localhost:8080/api/carreras'; // Backend endpoint for Carrera

  constructor(private http: HttpClient) {}

  getAll(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl);
  }
}

