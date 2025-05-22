import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  // Cualquier otra ruta vuelve al menú (ruta raíz vacía)
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
