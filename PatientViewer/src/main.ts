
import { environment } from './environment';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

export function getApiBaseUrl() {
  return environment.API_BASE_URL;
}

const providers = [
  { provide: 'API_BASE_URL', useFactory: getApiBaseUrl }

];


platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
