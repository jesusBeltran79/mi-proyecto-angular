import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectFourComponent } from './connect-four/connect-four.component';

const routes: Routes = [
  // ... tus otras rutas de juegos
  {
    path: 'connect-four',
    component: ConnectFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
