import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent }
];

export const appConfig = {
  providers: [
    importProvidersFrom(FormsModule, HttpClientModule),
    provideRouter(routes)
  ],
   imports: [ChatComponent]
};
