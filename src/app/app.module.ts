import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Importa RouterModule para <router-outlet> y [routerLink]
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// Declaramos aquí el Navbar que usa routerLink
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent    // ← Asegúrate de declarar tu Navbar aquí
    // NO declares ConnectFourResultComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // contiene RouterModule.forRoot(...)
    RouterModule       // necesario para routerLink y router-outlet en AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
