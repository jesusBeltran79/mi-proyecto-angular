import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SledRacingComponent }        from './sled-racing.component';
import { StartScreenComponent }       from './components/start-screen/start-screen.component';
import { InstructionModalComponent }  from './components/instruction-modal/instruction-modal.component';
import { GameScreenComponent }        from './components/game-screen/game-screen.component';
import { EndScreenComponent }         from './components/end-screen/end-screen.component';
import { HudComponent }               from './components/hud/hud.component';

const routes: Routes = [
  { path: '', component: SledRacingComponent }
];

@NgModule({
  declarations: [
    SledRacingComponent,
    StartScreenComponent,
    InstructionModalComponent,
    GameScreenComponent,
    EndScreenComponent,
    HudComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SledRacingModule { }
