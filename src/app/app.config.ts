import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { initI18Next } from './i18n/i18n.init';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    //provideZonelessChangeDetection(),
    provideAppInitializer(initI18Next),
    provideHttpClient(),
    provideRouter(routes),
  ],
};
