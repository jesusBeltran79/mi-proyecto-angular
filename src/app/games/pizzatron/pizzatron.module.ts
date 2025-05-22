// src/app/games/pizzatron/pizzatron.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PizzatronRoutingModule } from './pizzatron-routing.module';
import { MenuPizzatronComponent } from './menu-pizzatron/menu-pizzatron.component';
import { PlayPizzatronComponent } from './play-pizzatron/play-pizzatron.component';

@NgModule({
  declarations: [
    MenuPizzatronComponent,
    PlayPizzatronComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PizzatronRoutingModule
  ]
})
export class PizzatronModule {}
