import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Rol } from '../../shared/models/rol';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private apiUrluser = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    localStorage.removeItem('authToken');
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

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Comprueba si hay un token
  }

  /**
   * Decodifica el token JWT para extraer el payload
   */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // El payload está en la segunda parte del token
      return JSON.parse(atob(payload)); // Decodifica el payload desde Base64
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }


  /**
   * Obtiene el username del usuario actual desde el token JWT
   */
  getCurrentUsername(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded?.sub || null; // Extrae el campo `sub` del token (que representa el username)
    }
    return null;
  }

  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrluser}/id-by-username/${username}`);
  }

  getRolesByUsername(username: string): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrluser}/roles/${username}`);
  }
}
