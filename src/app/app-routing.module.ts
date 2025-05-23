import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Menú principal de juegos (ruta raíz vacía)
  {
    path: '',
    loadChildren: () =>
      import('./games/games.module').then(m => m.GamesModule)
  },

  // Lazy‐load de Pizzatron
  {
    path: 'games/pizzatron',
    loadChildren: () =>
      import('./games/pizzatron/pizzatron.module').then(m => m.PizzatronModule)
  },
  // Lazy‐load de Bean Counters
  {
    path: 'games/bean-counters',
    loadChildren: () =>
      import('./games/bean-counters/bean-counters.module').then(m => m.BeanCountersModule)
  },
  // Lazy‐load de Sled Racing
  {
    path: 'games/sled-racing',
    loadChildren: () =>
      import('./games/sled-racing/sled-racing.module').then(m => m.SledRacingModule)
  },
  // Lazy‐load de Connect Four
  {
    path: 'games/connect-four',
    loadChildren: () =>
      import('./games/connect-four/connect-four.module').then(m => m.ConnectFourModule)
  },

  // Cualquier otra ruta vuelve al menú (landing de Juegos)
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
