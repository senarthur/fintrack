import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import LocalePt from '@angular/common/locales/pt';
import { authInterceptor, errorInterceptor } from './core/auth/auth.interceptor';

registerLocaleData(LocalePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
};
