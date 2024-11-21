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

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtén el token desde localStorage
    const token = localStorage.getItem('authToken');

    // Si el token existe, agrega el encabezado Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Interceptor: Token encontrado:', token);
    }
    else{
        console.error('Interceptor: No se encontró token');
    }

    // Manejo de la solicitud y errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Error 401: Token inválido o expirado');
          // Redirige al login si es necesario
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
