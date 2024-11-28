import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthInterceptor } from './core/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Habilita soporte para interceptores
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Permite múltiples interceptores
    },
  ],
};