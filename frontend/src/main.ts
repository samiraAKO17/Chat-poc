(window as any).global = window.globalThis;
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
        importProvidersFrom(HttpClientModule) 

  ]
}).catch(err => console.error(err));