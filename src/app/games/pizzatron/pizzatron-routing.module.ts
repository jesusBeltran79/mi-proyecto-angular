// src/app/games/pizzatron/pizzatron-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPizzatronComponent } from './menu-pizzatron/menu-pizzatron.component';
import { PlayPizzatronComponent } from './play-pizzatron/play-pizzatron.component';

const routes: Routes = [
  { path: '', component: MenuPizzatronComponent },
  { path: 'play', component: PlayPizzatronComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzatronRoutingModule {}
