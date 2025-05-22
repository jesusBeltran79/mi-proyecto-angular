import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { EndScreenComponent } from './end-screen/end-screen.component';

const routes: Routes = [
  { path: '', component: StartScreenComponent, pathMatch: 'full' },
  { path: 'play', component: GameScreenComponent },
  { path: 'end', component: EndScreenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeanCountersRoutingModule { }
