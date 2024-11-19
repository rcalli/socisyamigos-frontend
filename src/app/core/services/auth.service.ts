import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.accessToken) {
          localStorage.setItem('authToken', response.accessToken); // Guarda el token
        } else {
          console.error('No se recibió un token en la respuesta del backend');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Elimina el token al cerrar sesión
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Comprueba si hay un token
  }
}
