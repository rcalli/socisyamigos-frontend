import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  private isTokenExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedPayload.exp && decodedPayload.exp < currentTime;
    } catch (e) {
      console.error('Error al verificar la expiración del token:', e);
      return true; // Asumimos que el token está expirado si ocurre un error
    }
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token desde localStorage
     const token = localStorage.getItem('authToken');

    // Si el token existe
    if (token) {
      // Verifica si ha expirado
      if (this.isTokenExpired(token)) {
        console.error('Interceptor: Token expirado, redirigiendo al login...');
        //localStorage.removeItem('authToken'); // Limpia el token
        //this.router.navigate(['/login']); // Redirige al login
        return throwError(() => new Error('Token expirado'));
      }

      // Si el token es válido, agrega el encabezado Authorization
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Interceptor: Token válido:', token);
    } else {
      console.error('Interceptor: No se encontró token');
    }

    // Manejo de la solicitud y errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Error 401: Token inválido o expirado');
          //localStorage.removeItem('authToken'); // Limpia el token
          //this.router.navigate(['/login']); // Redirige al login
        }
        if (error.status === 403) {
          console.error('Error 403: Acceso denegado');
        }
        // Devuelve el error para que pueda manejarse a nivel de servicio o componente
        return throwError(() => error);
      })
    );
  }
}
