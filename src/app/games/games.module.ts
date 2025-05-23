import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GamesRoutingModule } from './games-routing.module';
// ← Eliminamos ConnectFourComponent, no debe ir aquí:
import { ConnectFourResultComponent } from './connect-four-result/connect-four-result.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    // ConnectFourComponent removed → solo declarado en ConnectFourModule
    ConnectFourResultComponent
    // ... otros componentes de games
  ],
  imports: [
    CommonModule,
    RouterModule,
    GamesRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class GamesModule { }
